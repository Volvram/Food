import React from "react";

import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FoodCard from "./components/FoodCard/FoodCard";
import styles from "./styles.module.scss";
import { responsiveCarousel } from "@/shared/responsiveCarousel";
import { shuffle } from "@/shared/shuffle";
import { CategoryType } from "@/store/CreateDishContentStore";
import SearchContentStore, {
  CategoriesType,
  DishType,
} from "@/store/SearchContentStore";
import { FiltersType } from "@/store/SearchFiltersStore";
import { useLocalStore } from "@/utils/useLocalStore";

// TODO Заменить временную заглушку

export const dishes: DishType[] = [
  {
    id: "1",
    name: "Цезарь с бельгийским сыром",
    image:
      "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1879&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Сочный салат Цезарь с бельгийским сыром — это настоящее удовольствие для ваших вкусовых рецепторов. Хрустящий лист салата, обсыпанный ароматными крошками сыра, сочетается с нежным вкусом заправки и нежными кусочками куриного мяса. Этот салат станет прекрасным выбором для любого гурмана, желающего насладиться гармонией вкусов и текстур.",
    energy: 350,
    protein: 20,
    carbs: 15,
    fat: 25,
  },
  {
    id: "2",
    name: "Помидоры со моцареллой и хашбрауном",
    image:
      "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Этот свежий рецепт сочного блюда — идеальный выбор для тех, кто ценит вкус и простоту. Сочетание спелых помидоров, нежной моцареллы и хрустящего хашбрауна создает уникальный вкусовой букет. Это блюдо станет отличным началом вашего обеда или ужина, наполняя вас энергией и восхитительными вкусами.",
    energy: 280,
    protein: 10,
    carbs: 30,
    fat: 15,
  },
  {
    id: "3",
    name: "Коул соул",
    image:
      "https://images.unsplash.com/photo-1617343257769-e425deafd01e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Коул соул — это настоящий хит среди любителей вегетарианской кухни. Сочные листья капусты, тщательно обработанные и заправленные ароматным соусом, придадут вашему обеду не только насыщенный вкус, но и волшебное ощущение вдохновения. Уникальный опыт для тех, кто стремится познакомиться с необычными и вкусными блюдами.",
    energy: 200,
    protein: 8,
    carbs: 25,
    fat: 12,
  },
  {
    id: "4",
    name: "Минестролле с красным перцем",
    image:
      "https://images.unsplash.com/photo-1630492782892-74f99406dc59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Ароматный минестроне, приготовленный с любовью, с добавлением сочного красного перца, восхитит ваши вкусовые рецепторы. Нежный бульон, пропитанный вкусом свежих овощей, сливается с легкостью в каждой ложке этого блюда, создавая умиротворенное чувство гармонии.",
    energy: 320,
    protein: 12,
    carbs: 45,
    fat: 14,
  },
  {
    id: "5",
    name: "Домашний чили",
    image:
      "https://images.unsplash.com/photo-1524257062421-04872383ea43?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Это горячее и ароматное домашнее чили станет настоящим кулинарным путеводителем в мир изысканных вкусов. Сочные кусочки мяса, спелые помидоры и разнообразные специи создают великолепное сочетание, которое разгонит холод и прогреет ваш вечер.",
    energy: 450,
    protein: 20,
    carbs: 30,
    fat: 22,
  },
  {
    id: "6",
    name: "Шотландский завтрак",
    image:
      "https://images.unsplash.com/photo-1618666185697-b4aabeedd8bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Погрузитесь в атмосферу Шотландии с нашим великолепным шотландским завтраком. Каждая деталь этого блюда воссоздает вкус и аромат традиционных шотландских продуктов, от сосисок и яичницы до хрустящего тоста и грильованных грибов.",
    energy: 600,
    protein: 18,
    carbs: 42,
    fat: 38,
  },
  {
    id: "7",
    name: "Овощной суп",
    image:
      "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Ароматный овощной суп - настоящее утешение для души и тела. Нежный бульон, наполненный свежими овощами, создает неповторимый вкусовой букет. В каждой ложке вы найдете сочные кусочки моркови, картошки, брокколи и других витаминных сокровищ. Этот суп - настоящее воплощение заботы о вашем здоровье и удовольствии от каждого глотка.",
    energy: 150,
    protein: 5,
    carbs: 30,
    fat: 2,
  },
  {
    id: "8",
    name: "Жареная форель с рисом и овощами",
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Это блюдо - настоящий праздник для ваших вкусовых рецепторов. Сочная форель, обжаренная до золотистой корки, подается на картошке и рисе, сопровождаемых свежими овощами. Каждый кусочек рыбы насыщен ароматом пряных трав и приправ, создавая неповторимую гармонию вкусов. Жареная форель с рисом и овощами - истинное удовольствие для гурманов.",
    energy: 350,
    protein: 20,
    carbs: 45,
    fat: 15,
  },
  {
    id: "9",
    name: "Камбала на гриле",
    image:
      "https://images.unsplash.com/photo-1600175074394-f2f4c500f7ea?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Камбала на гриле - это искусство приготовления рыбы, приведенное к совершенству. Нежное мясо камбалы, припеченное на гриле, обладает легким дымком и невероятно нежным вкусом. Подается с лимоном и зеленью, блюдо станет настоящим угощением для ценителей изысканной рыбной кухни.",
    energy: 250,
    protein: 18,
    carbs: 12,
    fat: 10,
  },
  {
    id: "10",
    name: "Курица карри",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Курица карри - это настоящий фейерверк вкусов. Нежные кусочки курицы, пропитанные ароматным соусом на основе кокосового молока и карри, создают взрыв вкусовых ощущений. Подается с ароматным базмати-рисом, это блюдо станет ярким акцентом в вашем кулинарном опыте.",
    energy: 300,
    protein: 15,
    carbs: 20,
    fat: 18,
  },
  {
    id: "11",
    name: "Куриные крылья в медово-горчичном соусе",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Нежные куриные крылья, обжаренные до золотистой корки и залитые медово-горчичным соусом, станут настоящим угощением для ваших вкусовых рецепторов. Сочные кусочки мяса в сочетании с сладким оттенком меда и легкой остротой горчицы создают неповторимый вкусовой букет, который точно покорит ваш вкус.",
    energy: 350,
    protein: 25,
    carbs: 15,
    fat: 20,
  },
  {
    id: "12",
    name: "Салат с тунцом и рукколой",
    image:
      "https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Этот освежающий салат с тунцом и рукколой порадует вас сочным сочетанием морского вкуса тунца, хрустящей свежей рукколы и ароматного оливкового масла. Каждый вкусовой аккорд этого блюда приносит ощущение летней свежести и полезности.",
    energy: 250,
    protein: 20,
    carbs: 10,
    fat: 15,
  },
  {
    id: "13",
    name: "Домашний синнабон",
    image:
      "https://images.unsplash.com/photo-1638315207735-d60e0a8f159f?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Погрузитесь в мир сладкого наслаждения с нашим домашним синнабоном. Нежное тесто, пропитанное корицей и коричневым сахаром, переливается слоем ароматной глазури. Этот десерт не просто тает во рту, а пробуждает в вас волшебство настоящего кулинарного искусства.",
    energy: 450,
    protein: 5,
    carbs: 55,
    fat: 25,
  },
  {
    id: "14",
    name: "Карбонара",
    image:
      "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Попробуйте настоящую итальянскую классику - пасту карбонара. Ароматный спагетти, облитые сливочным соусом с яйцами, обжаренным беконом и свежим пармезаном, создают неповторимый вкусовой опыт. Это блюдо пробуждает в вас аппетит и транспортирует прямо в уютные улочки Рима.",
    energy: 400,
    protein: 15,
    carbs: 30,
    fat: 20,
  },
  {
    id: "15",
    name: "Вареники с картошкой",
    image:
      "https://images.unsplash.com/photo-1581515092908-42bae9a80350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Нежные вареники, приготовленные с любовью, представляют собой тонкий лепёшечный тесто, обнимающий сочное начинение из мягкой картошки. Каждый укус наполняется ароматом свежего теста, а сочетание нежной начинки создает волшебный вкус, который напоминает о теплых домашних вечерах.",
    energy: 350,
    protein: 8,
    carbs: 45,
    fat: 15,
  },
  {
    id: "16",
    name: "Мини пельмени с бульоном и зелёным луком",
    image:
      "https://images.unsplash.com/photo-1600041974426-c62f5a7eddb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Эти маленькие кулинарные шедевры, мини-пельмени, плывут в ароматном бульоне, украшенные свежим зелёным луком. Их нежные контуры раскрываются в каждом глотке, создавая умиротворенное ощущение уюта, а вкус бульона смешивается с нежностью фарша, оставляя теплый след на языке.",
    energy: 280,
    protein: 12,
    carbs: 30,
    fat: 14,
  },
  {
    id: "17",
    name: "Паштет куриный домашний",
    image:
      "https://images.unsplash.com/photo-1625938146357-754891591b16?q=80&w=1897&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Насладитесь неповторимым вкусом домашнего куриного паштета, тающего на языке. Тщательно подобранная комбинация специй придает ему нежный аромат, а мягкая текстура делает этот паштет идеальным дополнением к свежему хлебу. Откройте для себя вкус, который пробуждает воспоминания о семейных традициях.",
    energy: 220,
    protein: 18,
    carbs: 5,
    fat: 15,
  },
  {
    id: "18",
    name: "Оладьи на кефире",
    image:
      "https://images.unsplash.com/photo-1662645984203-736226e1c367?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Сочные оладьи на кефире — это исключительное удовольствие для ваших вкусовых рецепторов. Их нежная текстура и легкая хрустящая корка создают идеальный баланс, а аромат свежего теста и ванильного вкуса добавляют этому блюду особое волшебство. Погрузитесь в атмосферу уюта с этим восхитительным угощением.",
    energy: 180,
    protein: 4,
    carbs: 25,
    fat: 8,
  },
  {
    id: "19",
    name: "Жаренные лисички",
    image:
      "https://images.unsplash.com/photo-1631637347196-deea609a9b5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Нежные, ароматные грибы лисички, обжаренные до золотистой корки, представляют собой настоящую деликатесную поучку. Их мягкость и сочность, сочетаемые с замечательным вкусом, превращают этот грибной деликатес в идеальное блюдо для тех, кто ценит природные вкусы леса.",
    energy: 150,
    protein: 5,
    carbs: 10,
    fat: 12,
  },
  {
    id: "20",
    name: "Драники классические",
    image:
      "https://images.unsplash.com/photo-1678684277720-8032257415bc?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Драники — это традиционное белорусское блюдо, приготовленное из тертого картофеля, смешанного с луком и жареного на сковороде до золотистой корки. Хрустящая внешность и нежная внутренность делают эти драники неповторимыми и невероятно вкусными.",
    energy: 220,
    protein: 4,
    carbs: 25,
    fat: 12,
  },
  {
    id: "21",
    name: "Красный мохито",
    image:
      "https://images.unsplash.com/photo-1662550577541-5e8f192e6514?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Освежающий красный мохито — это идеальный напиток для тех, кто ищет что-то необычное. Сочетание клубничного пюре, свежей мяты и лайма создает неповторимый вкус, окутывая вас свежестью и радостью.",
    energy: 120,
    protein: 1,
    carbs: 30,
    fat: 0,
  },
  {
    id: "22",
    name: "Тыквенный суп",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Ароматный тыквенный суп — это настоящая теплая объятия в холодный день. Сочетание нежной тыквы, приправленной специями и сливочным кремом, создает удивительно нежный вкус, который согреет вас изнутри.",
    energy: 180,
    protein: 3,
    carbs: 20,
    fat: 10,
  },
  {
    id: "23",
    name: "Овощные рулеты с баклажанов",
    image:
      "https://images.unsplash.com/photo-1617460182733-e555b2ce5ede?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Эти овощные рулеты с баклажанами — это настоящий кулинарный шедевр. Тонкие ломтики баклажана обернуты в сочные овощи, а затем запечены до золотистой корки. Каждый кусочек наполнен ярким вкусом природы и свежести.",
    energy: 160,
    protein: 5,
    carbs: 15,
    fat: 8,
  },
  {
    id: "24",
    name: "Том ям",
    image:
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Окунитесь в вихрь восточных вкусов с нашим непревзойденным Том Ямом! Этот взрыв ароматов и вкусов, сочетающий в себе остроту лемонграсса, пряность тайского перца и нежность креветок, принесет вам удовольствие в каждом глотке.",
    energy: 180,
    protein: 10,
    carbs: 20,
    fat: 12,
  },
];

export const categories: CategoryType[] = [
  {
    id: "1",
    name: "Рекомендованное",
  },
  {
    id: "2",
    name: "Новогоднее настроение",
  },
  {
    id: "3",
    name: "Быстрый перекус",
  },
  {
    id: "4",
    name: "Домашний ресторан",
  },
];

export const categoriesDishes: CategoriesType[] = [
  {
    category: "1",
    dishes: [
      {
        id: "5",
        name: "Домашний чили",
        image:
          "https://images.unsplash.com/photo-1524257062421-04872383ea43?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Это горячее и ароматное домашнее чили станет настоящим кулинарным путеводителем в мир изысканных вкусов. Сочные кусочки мяса, спелые помидоры и разнообразные специи создают великолепное сочетание, которое разгонит холод и прогреет ваш вечер.",
        energy: 450,
        protein: 20,
        carbs: 30,
        fat: 22,
      },
      {
        id: "9",
        name: "Камбала на гриле",
        image:
          "https://images.unsplash.com/photo-1600175074394-f2f4c500f7ea?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Камбала на гриле - это искусство приготовления рыбы, приведенное к совершенству. Нежное мясо камбалы, припеченное на гриле, обладает легким дымком и невероятно нежным вкусом. Подается с лимоном и зеленью, блюдо станет настоящим угощением для ценителей изысканной рыбной кухни.",
        energy: 250,
        protein: 18,
        carbs: 12,
        fat: 10,
      },
      {
        id: "12",
        name: "Салат с тунцом и рукколой",
        image:
          "https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Этот освежающий салат с тунцом и рукколой порадует вас сочным сочетанием морского вкуса тунца, хрустящей свежей рукколы и ароматного оливкового масла. Каждый вкусовой аккорд этого блюда приносит ощущение летней свежести и полезности.",
        energy: 250,
        protein: 20,
        carbs: 10,
        fat: 15,
      },
      {
        id: "14",
        name: "Карбонара",
        image:
          "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Попробуйте настоящую итальянскую классику - пасту карбонара. Ароматный спагетти, облитые сливочным соусом с яйцами, обжаренным беконом и свежим пармезаном, создают неповторимый вкусовой опыт. Это блюдо пробуждает в вас аппетит и транспортирует прямо в уютные улочки Рима.",
        energy: 400,
        protein: 15,
        carbs: 30,
        fat: 20,
      },
      {
        id: "22",
        name: "Тыквенный суп",
        image:
          "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Ароматный тыквенный суп — это настоящая теплая объятия в холодный день. Сочетание нежной тыквы, приправленной специями и сливочным кремом, создает удивительно нежный вкус, который согреет вас изнутри.",
        energy: 180,
        protein: 3,
        carbs: 20,
        fat: 10,
      },
      {
        id: "23",
        name: "Овощные рулеты с баклажанов",
        image:
          "https://images.unsplash.com/photo-1617460182733-e555b2ce5ede?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Эти овощные рулеты с баклажанами — это настоящий кулинарный шедевр. Тонкие ломтики баклажана обернуты в сочные овощи, а затем запечены до золотистой корки. Каждый кусочек наполнен ярким вкусом природы и свежести.",
        energy: 160,
        protein: 5,
        carbs: 15,
        fat: 8,
      },
    ],
  },
  {
    category: "2",
    dishes: [
      {
        id: "2",
        name: "Помидоры со моцареллой и хашбрауном",
        image:
          "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Этот свежий рецепт сочного блюда — идеальный выбор для тех, кто ценит вкус и простоту. Сочетание спелых помидоров, нежной моцареллы и хрустящего хашбрауна создает уникальный вкусовой букет. Это блюдо станет отличным началом вашего обеда или ужина, наполняя вас энергией и восхитительными вкусами.",
        energy: 280,
        protein: 10,
        carbs: 30,
        fat: 15,
      },
      {
        id: "13",
        name: "Домашний синнабон",
        image:
          "https://images.unsplash.com/photo-1638315207735-d60e0a8f159f?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Погрузитесь в мир сладкого наслаждения с нашим домашним синнабоном. Нежное тесто, пропитанное корицей и коричневым сахаром, переливается слоем ароматной глазури. Этот десерт не просто тает во рту, а пробуждает в вас волшебство настоящего кулинарного искусства.",
        energy: 450,
        protein: 5,
        carbs: 55,
        fat: 25,
      },
      {
        id: "19",
        name: "Жаренные лисички",
        image:
          "https://images.unsplash.com/photo-1631637347196-deea609a9b5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Нежные, ароматные грибы лисички, обжаренные до золотистой корки, представляют собой настоящую деликатесную поучку. Их мягкость и сочность, сочетаемые с замечательным вкусом, превращают этот грибной деликатес в идеальное блюдо для тех, кто ценит природные вкусы леса.",
        energy: 150,
        protein: 5,
        carbs: 10,
        fat: 12,
      },
      {
        id: "11",
        name: "Куриные крылья в медово-горчичном соусе",
        image:
          "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Нежные куриные крылья, обжаренные до золотистой корки и залитые медово-горчичным соусом, станут настоящим угощением для ваших вкусовых рецепторов. Сочные кусочки мяса в сочетании с сладким оттенком меда и легкой остротой горчицы создают неповторимый вкусовой букет, который точно покорит ваш вкус.",
        energy: 350,
        protein: 25,
        carbs: 15,
        fat: 20,
      },
      {
        id: "15",
        name: "Вареники с картошкой",
        image:
          "https://images.unsplash.com/photo-1581515092908-42bae9a80350?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Нежные вареники, приготовленные с любовью, представляют собой тонкий лепёшечный тесто, обнимающий сочное начинение из мягкой картошки. Каждый укус наполняется ароматом свежего теста, а сочетание нежной начинки создает волшебный вкус, который напоминает о теплых домашних вечерах.",
        energy: 350,
        protein: 8,
        carbs: 45,
        fat: 15,
      },
      {
        id: "21",
        name: "Красный мохито",
        image:
          "https://images.unsplash.com/photo-1662550577541-5e8f192e6514?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Освежающий красный мохито — это идеальный напиток для тех, кто ищет что-то необычное. Сочетание клубничного пюре, свежей мяты и лайма создает неповторимый вкус, окутывая вас свежестью и радостью.",
        energy: 120,
        protein: 1,
        carbs: 30,
        fat: 0,
      },
    ],
  },
  {
    category: "3",
    dishes: [
      {
        id: "1",
        name: "Цезарь с бельгийским сыром",
        image:
          "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1879&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Сочный салат Цезарь с бельгийским сыром — это настоящее удовольствие для ваших вкусовых рецепторов. Хрустящий лист салата, обсыпанный ароматными крошками сыра, сочетается с нежным вкусом заправки и нежными кусочками куриного мяса. Этот салат станет прекрасным выбором для любого гурмана, желающего насладиться гармонией вкусов и текстур.",
        energy: 350,
        protein: 20,
        carbs: 15,
        fat: 25,
      },
      {
        id: "3",
        name: "Коул соул",
        image:
          "https://images.unsplash.com/photo-1617343257769-e425deafd01e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Коул соул — это настоящий хит среди любителей вегетарианской кухни. Сочные листья капусты, тщательно обработанные и заправленные ароматным соусом, придадут вашему обеду не только насыщенный вкус, но и волшебное ощущение вдохновения. Уникальный опыт для тех, кто стремится познакомиться с необычными и вкусными блюдами.",
        energy: 200,
        protein: 8,
        carbs: 25,
        fat: 12,
      },
      {
        id: "6",
        name: "Шотландский завтрак",
        image:
          "https://images.unsplash.com/photo-1618666185697-b4aabeedd8bb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Погрузитесь в атмосферу Шотландии с нашим великолепным шотландским завтраком. Каждая деталь этого блюда воссоздает вкус и аромат традиционных шотландских продуктов, от сосисок и яичницы до хрустящего тоста и грильованных грибов.",
        energy: 600,
        protein: 18,
        carbs: 42,
        fat: 38,
      },
      {
        id: "16",
        name: "Мини пельмени с бульоном и зелёным луком",
        image:
          "https://images.unsplash.com/photo-1600041974426-c62f5a7eddb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Эти маленькие кулинарные шедевры, мини-пельмени, плывут в ароматном бульоне, украшенные свежим зелёным луком. Их нежные контуры раскрываются в каждом глотке, создавая умиротворенное ощущение уюта, а вкус бульона смешивается с нежностью фарша, оставляя теплый след на языке.",
        energy: 280,
        protein: 12,
        carbs: 30,
        fat: 14,
      },
      {
        id: "18",
        name: "Оладьи на кефире",
        image:
          "https://images.unsplash.com/photo-1662645984203-736226e1c367?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Сочные оладьи на кефире — это исключительное удовольствие для ваших вкусовых рецепторов. Их нежная текстура и легкая хрустящая корка создают идеальный баланс, а аромат свежего теста и ванильного вкуса добавляют этому блюду особое волшебство. Погрузитесь в атмосферу уюта с этим восхитительным угощением.",
        energy: 180,
        protein: 4,
        carbs: 25,
        fat: 8,
      },
      {
        id: "20",
        name: "Драники классические",
        image:
          "https://images.unsplash.com/photo-1678684277720-8032257415bc?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Драники — это традиционное белорусское блюдо, приготовленное из тертого картофеля, смешанного с луком и жареного на сковороде до золотистой корки. Хрустящая внешность и нежная внутренность делают эти драники неповторимыми и невероятно вкусными.",
        energy: 220,
        protein: 4,
        carbs: 25,
        fat: 12,
      },
    ],
  },
  {
    category: "4",
    dishes: [
      {
        id: "4",
        name: "Минестролле с красным перцем",
        image:
          "https://images.unsplash.com/photo-1630492782892-74f99406dc59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Ароматный минестроне, приготовленный с любовью, с добавлением сочного красного перца, восхитит ваши вкусовые рецепторы. Нежный бульон, пропитанный вкусом свежих овощей, сливается с легкостью в каждой ложке этого блюда, создавая умиротворенное чувство гармонии.",
        energy: 320,
        protein: 12,
        carbs: 45,
        fat: 14,
      },
      {
        id: "17",
        name: "Паштет куриный домашний",
        image:
          "https://images.unsplash.com/photo-1625938146357-754891591b16?q=80&w=1897&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Насладитесь неповторимым вкусом домашнего куриного паштета, тающего на языке. Тщательно подобранная комбинация специй придает ему нежный аромат, а мягкая текстура делает этот паштет идеальным дополнением к свежему хлебу. Откройте для себя вкус, который пробуждает воспоминания о семейных традициях.",
        energy: 220,
        protein: 18,
        carbs: 5,
        fat: 15,
      },
      {
        id: "8",
        name: "Жареная форель с рисом и овощами",
        image:
          "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Это блюдо - настоящий праздник для ваших вкусовых рецепторов. Сочная форель, обжаренная до золотистой корки, подается на картошке и рисе, сопровождаемых свежими овощами. Каждый кусочек рыбы насыщен ароматом пряных трав и приправ, создавая неповторимую гармонию вкусов. Жареная форель с рисом и овощами - истинное удовольствие для гурманов.",
        energy: 350,
        protein: 20,
        carbs: 45,
        fat: 15,
      },
      {
        id: "10",
        name: "Курица карри",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Курица карри - это настоящий фейерверк вкусов. Нежные кусочки курицы, пропитанные ароматным соусом на основе кокосового молока и карри, создают взрыв вкусовых ощущений. Подается с ароматным базмати-рисом, это блюдо станет ярким акцентом в вашем кулинарном опыте.",
        energy: 300,
        protein: 15,
        carbs: 20,
        fat: 18,
      },
      {
        id: "7",
        name: "Овощной суп",
        image:
          "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Ароматный овощной суп - настоящее утешение для души и тела. Нежный бульон, наполненный свежими овощами, создает неповторимый вкусовой букет. В каждой ложке вы найдете сочные кусочки моркови, картошки, брокколи и других витаминных сокровищ. Этот суп - настоящее воплощение заботы о вашем здоровье и удовольствии от каждого глотка.",
        energy: 150,
        protein: 5,
        carbs: 30,
        fat: 2,
      },
      {
        id: "24",
        name: "Том ям",
        image:
          "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description:
          "Окунитесь в вихрь восточных вкусов с нашим непревзойденным Том Ямом! Этот взрыв ароматов и вкусов, сочетающий в себе остроту лемонграсса, пряность тайского перца и нежность креветок, принесет вам удовольствие в каждом глотке.",
        energy: 180,
        protein: 10,
        carbs: 20,
        fat: 12,
      },
    ],
  },
];
// TODO ----------------------

type SearchContentProps = {
  searchMode: "categories" | "commonSearch";
  filters: FiltersType | null;
};

const SearchContent: React.FC<SearchContentProps> = ({
  searchMode,
  filters,
}) => {
  const router = useRouter();

  const searchContentStore = useLocalStore(() => new SearchContentStore());

  // @TODO Убрать имитацию
  React.useEffect(() => {
    searchContentStore.setCategories(categories);
    searchContentStore.setCategoriesDishes(categoriesDishes);
  }, []);

  // React.useEffect(() => {
  //   if (router.query.search) {
  //     const searchedDishes = dishes.filter((dish) => {
  //       return dish.name
  //         .toLowerCase()
  //         .includes(String(router.query.search).toLowerCase());
  //     });

  //     searchContentStore.setDishes(searchedDishes);
  //   } else {
  //     searchContentStore.setDishes(dishes);
  //   }

  //   // @FIX Здесь удаляется значение поиска при обновлении страницы
  //   handlePageChange(1);
  // }, [router.query.search]);
  // // @TODO ------------------------------------

  React.useEffect(() => {
    if (searchMode == "commonSearch") {
      if (router.query.search) {
        searchContentStore.requestDishes(filters, router.query.search);
      } else {
        searchContentStore.requestDishes(filters);
      }

      // @FIX Здесь удаляется значение поиска при обновлении страницы
      handlePageChange(1);
    }
  }, [searchMode, filters, router.query.search]);

  React.useEffect(() => {
    handlePageChange(router.query.page ? Number(router.query.page) : 1);
  }, [searchContentStore.dishes, searchContentStore.products]);

  const handlePageChange = React.useCallback(
    (value: number) => {
      searchContentStore.setCurrentPageDishes(
        searchContentStore.dishes.slice(
          (value - 1) * searchContentStore.countPerPage,
          value * searchContentStore.countPerPage,
        ),
      );

      searchContentStore.setCurrentPageProducts(
        searchContentStore.products.slice(
          (value - 1) * searchContentStore.countPerPage,
          value * searchContentStore.countPerPage,
        ),
      );

      router.push({ query: { ...router.query, page: value } });
    },
    [router],
  );

  return (
    <div className={styles.searchContent}>
      {searchMode === "categories" ? (
        <div className={styles.searchContent_categories}>
          {searchContentStore.categories.map((category) => {
            // @TODO отправить обработку в другое место
            const currentDishes = searchContentStore.categoriesDishes.find(
              (curr) => curr.category == category.id,
            )?.dishes;

            const randomizedCurrentDishes = shuffle(
              toJS(currentDishes)?.slice(0),
            );
            // @TODO ------------------------------------

            return (
              <div key={category.id}>
                <h2>{category.name}</h2>
                <Carousel
                  className={styles.searchContent_categories_carousel}
                  responsive={responsiveCarousel}
                >
                  {randomizedCurrentDishes?.map((item) => (
                    <Link
                      key={item.id}
                      href={`dishes/${item.id}`}
                      className={styles.searchContent_item}
                    >
                      <FoodCard item={item} />
                    </Link>
                  ))}
                </Carousel>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.searchContent_commonSearch}>
          <div className={styles.searchContent_commonSearch_items}>
            {(filters?.searchType == "Блюда" || filters == null) &&
            Boolean(searchContentStore.currentPageDishes.length) ? (
              searchContentStore.currentPageDishes.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`dishes/${item.id}`}
                    className={styles.searchContent_item}
                  >
                    <FoodCard item={item} />
                  </Link>
                );
              })
            ) : searchContentStore.currentPageProducts.length ? (
              searchContentStore.currentPageProducts.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`dishes/${item.id}`}
                    className={styles.searchContent_item}
                  >
                    <FoodCard item={item} />
                  </Link>
                );
              })
            ) : (
              <div>Данные не найдены</div>
            )}
          </div>
          <Pagination
            className={styles.searchContent_commonSearch_pagination}
            page={router.query.page ? Number(router.query.page) : 1}
            count={Math.ceil(
              searchContentStore.dishes.length /
                searchContentStore.countPerPage,
            )}
            variant="outlined"
            shape="rounded"
            onChange={(event, page) => handlePageChange(page)}
            renderItem={(item) => <PaginationItem {...item} />}
          />
        </div>
      )}
    </div>
  );
};

export default observer(SearchContent);
