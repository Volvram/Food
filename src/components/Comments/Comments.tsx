import React from "react";

import AttachmentIcon from "@mui/icons-material/Attachment";
import axios from "axios";
import cn from "classnames";
import dayjs from "dayjs";
import Image from "next/image";

import { CommentType } from "../Comment/Comment";
import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { HOST } from "@/shared/hosts";
import rootStore from "@/store/RootStore/instance";
import { log } from "@/utils/log";

type CommentsProps = {
  comments: CommentType[];
  onDelete?: () => void;
  className?: string;
};

export const Comments: React.FC<CommentsProps> = ({
  comments,
  onDelete,
  className,
}) => {
  const requestDeleteComment = async (commentId: number) => {
    try {
      await rootStore.user.checkAuthorization();

      const tokenType = localStorage.getItem("token_type");
      const accessToken = localStorage.getItem("access_token");

      const params: any = {
        id: commentId,
        user_id: rootStore.user.id,
      };

      const headers: any = {
        Authorization: `${tokenType} ${accessToken}`,
      };

      await axios({
        url: `${HOST}/comments/${commentId}`,
        method: "delete",
        params,
        headers,
      });
    } catch (e) {
      log("Comments: ", e);
      return Promise.reject(e);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    const answer = confirm("Удалить комментарий? Это действие необратимо");
    if (answer) {
      requestDeleteComment(commentId).then(
        () => {
          onDelete?.();
        },
        (error) => {
          alert(`Ошибка: ${error?.response?.data?.reason ?? error.message}`);
        },
      );
    }
  };

  return (
    <div className={cn(styles.root, className)}>
      {comments.length != 0 ? (
        <div className={styles.root_items}>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className={styles.root_items_item}>
                <div className={styles.root_items_item_user}>
                  {comment.user?.image ? (
                    <img
                      src={comment.user.image}
                      alt={comment.user.name}
                      className={styles.root_items_item_user_img}
                    />
                  ) : (
                    <Image
                      src={noImage}
                      alt={String(comment.user?.name)}
                      className={styles.root_items_item_user_img}
                    />
                  )}
                  <span className={styles.root_items_item_user_name}>
                    {comment.user?.name}
                  </span>
                  {rootStore.user.id == comment.user?.id && (
                    <div
                      className={styles.root_items_item_delete}
                      onClick={() => {
                        if (comment.id) {
                          handleDeleteComment(comment.id);
                        }
                      }}
                    >
                      Удалить
                    </div>
                  )}
                </div>
                <div className={styles.root_items_item_message}>
                  {comment.message}
                </div>
                <div className={styles.root_items_item_bottom}>
                  {comment.attachments && (
                    <div className={styles.root_items_item_bottom_files}>
                      <AttachmentIcon
                        className={styles.root_items_item_bottom_files_icon}
                      />
                      {comment.attachments.map((attachment, index) => {
                        return (
                          <a
                            key={`${attachment.fileName}${index}`}
                            href={attachment.downloadUri}
                            download={attachment.fileName}
                            className={styles.root_items_item_bottom_files_link}
                          >
                            {attachment.fileName}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  <span className={styles.root_items_item_bottom_date}>
                    {dayjs(comment.createdAt).format("DD.MM.YYYY | HH:mm")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.root_empty}>Комментариев нет</div>
      )}
    </div>
  );
};
