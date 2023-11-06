import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import style from "./styles.module.scss";

const accordions = [
  {
    id: "1",
    name: "Колорийность",
    details: "123",
  },
  {
    id: "2",
    name: "Кухня",
    details: "123",
  },
  {
    id: "3",
    name: "Категория",
    details: "123",
  },
  {
    id: "4",
    name: "Время приготовления",
    details: "123",
  },
  {
    id: "5",
    name: "Метод приготовления",
    details: "123",
  },
];
const SearchFilters = () => {
  return (
    <div className={style.filtersearch}>
      <div className={style.filtersearch_inner}>
        <div className={style.filtersearch_inner_check}>
          <label>
            <Radio />
            Блюдо
          </label>

          <label>
            <Radio />
            Продукты
          </label>
        </div>
        <div className={style.filtersearch_inner_accardion}>
          {accordions.map((el) => {
            return (
              <Accordion key={el.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{el.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{el.details}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
        <div className={style.filtersearch_inner_switch}>
          <Typography>Убрать напитки</Typography>
          <Switch />
        </div>

        <div className={style.filtersearch_inner_container}>
          <div className={style.filtersearch_inner_container_button}>
            Фасоль
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
