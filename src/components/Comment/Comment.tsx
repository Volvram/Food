import React from "react";

import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import cn from "classnames";
import Image from "next/image";

import { Input } from "../Input";
import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import rootStore from "@/store/RootStore/instance";
import { UserType } from "@/store/RootStore/UserStore";

export type CommentType = {
  id: number;
  message: string;
  user?: UserType;
  attachments: AttachmentType[];
  reactions: ReactionType[];
  updatedAt?: Date;
  createdAt: Date;
};

export type AttachmentType = {
  fileName: string;
  file: File;
  downloadUri?: string;
};

export type ReactionType = {
  userId: number;
  commentId: number;
  emoji: string;
};

type CommentProps = {
  onSend: (comment: Partial<CommentType>) => void;
  className?: string;
};

export const Comment: React.FC<CommentProps> = ({ onSend, className }) => {
  const [message, setMessage] = React.useState("");
  const [attachments, setAttachments] = React.useState<AttachmentType[]>([]);
  const [reactions, setReactions] = React.useState<ReactionType[]>([]);

  const handleAttachFile = (file: File) => {
    setAttachments((prev) => {
      const curr = [...prev];
      curr.push({
        fileName: file.name,
        file,
      });
      return curr;
    });
  };

  const handleDetachFile = (file: AttachmentType) => {
    setAttachments((prev) => {
      const curr = [...prev].filter((f) => f.fileName != file.fileName);
      return curr;
    });
  };

  const handleSendComment = () => {
    const comment: Partial<CommentType> = {
      message,
      attachments,
      reactions,
    };
    onSend(comment);
    setMessage("");
    setAttachments([]);
    setReactions([]);
  };

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.root_panel}>
        {rootStore.user.image ? (
          <img
            src={rootStore.user.image}
            alt=""
            className={styles.root_panel_user_img}
          />
        ) : (
          <Image src={noImage} alt="" className={styles.root_panel_user_img} />
        )}

        <Input
          onChange={setMessage}
          placeholder="Комментарий"
          className={styles.root_panel_input}
          containerClassName={styles.root_panel_inputContainer}
        />

        <div>
          <label htmlFor="comments" className={styles.root_panel_label}>
            <AttachFileIcon className={styles.root_panel_iconButton_icon} />
          </label>
          <input
            type="file"
            id="comments"
            name="comments"
            onChange={(event) => {
              if (event.target.files) {
                handleAttachFile(event.target.files[0]);
              }
            }}
            className={styles.root_panel_load}
            accept="image/png, image/jpeg, image/jpg, .*"
          />
        </div>

        <IconButton
          id="fade-button"
          aria-haspopup="true"
          color="inherit"
          onClick={handleSendComment}
          className={styles.root_panel_iconButton}
        >
          <SendIcon className={styles.root_panel_iconButton_icon} />
        </IconButton>
      </div>

      {attachments.length != 0 && (
        <div>
          <span className={styles.root_text}>Файлы: </span>
          <div className={styles.root_files}>
            {attachments.map((attachment, index) => {
              return (
                <div
                  key={`${attachment.fileName} ${index}`}
                  className={styles.root_files_file}
                >
                  <span className={styles.root_files_file_name}>
                    {attachment.fileName}
                  </span>
                  <IconButton
                    id="fade-button"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => {
                      handleDetachFile(attachment);
                    }}
                    className={styles.root_files_file_del}
                  >
                    <CloseIcon className={styles.root_files_file_del_icon} />
                  </IconButton>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
