import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './CatalogPage.module.scss';
import { FilterForWine } from '../../components/FilterForWine';
import { ProductCard } from '../../components/ProductCard';
type CatalogPageProps = {
  category: 'all' | 'wine' | 'object' | 'certificate';
};

const wine = [
  {
    itemId: "1",
    title: "Settesoli Pinot Grigio",
    description:
      "A refined white wine from England, specifically the Surrey region. Offers flavors of pineapple, leather, coffee and is best described as Crisp & Zesty.",
    price: 40.0,
    capacity: 0.75,
    grape: "Orvieto",
    closure: "Natural Cork",
    country: "England",
    characteristics: ["pineapple", "leather", "coffee"],
    type: "White",
    ABV: 14.0,
    region: "Surrey",
    style: "Crisp & Zesty",
    vintage: 1998,
  },
  {
    itemId: "2",
    title: "Settesoli Cabernet Sauvignon",
    description:
      "A refined red wine from Chile, specifically the Chile region. Offers flavors of black fruit, blackberry, black fruit and is best described as Delicate & Dry.",
    price: 43.0,
    capacity: 0.75,
    grape: "Cabernet Sauvignon",
    closure: "Natural Cork",
    country: "Chile",
    characteristics: ["black fruit", "blackberry", "black fruit"],
    type: "Red",
    ABV: 14.0,
    region: "Chile",
    style: "Delicate & Dry",
    vintage: 2011,
  },
  {
    itemId: "3",
    title: "Jam Shed Chardonnay",
    description:
      "A refined white wine from Hungary. Offers flavors of green pepper, clove, cinnamon and is best described as Soft & Fruity.",
    price: 31.0,
    capacity: 0.75,
    grape: "Chardonnay",
    closure: "Natural Cork",
    country: "Hungary",
    characteristics: ["green pepper", "clove", "cinnamon"],
    type: "White",
    ABV: 13.5,
    region: "Hungary",
    style: "Soft & Fruity",
    vintage: 2009,
  },
  {
    itemId: "4",
    title: "Jam Shed Shiraz",
    description:
      "A refined red wine from New Zealand, specifically the Marlborough region. Offers flavors of mango, blueberry, strawberry and is best described as Rich & Juicy.",
    price: 55.0,
    capacity: 0.75,
    grape: "Primitivo",
    closure: "Natural Cork",
    country: "New Zealand",
    characteristics: ["mango", "blueberry", "strawberry"],
    type: "Red",
    ABV: 13.0,
    region: "Marlborough",
    style: "Rich & Juicy",
    vintage: 2019,
  },
  {
    itemId: "5",
    title: "Hardys Stamp Shiraz",
    description:
      "A refined red wine from Romania. Offers flavors of green apple, caramel, black fruit and is best described as Soft & Fruity.",
    price: 6.0,
    capacity: 0.75,
    grape: "Amarone",
    closure: "Natural Cork",
    country: "Romania",
    characteristics: ["green apple", "caramel", "black fruit"],
    type: "Red",
    ABV: 13.0,
    region: "Romania",
    style: "Soft & Fruity",
    vintage: 2024,
  },
  {
    itemId: "6",
    title: "Hardys Stamp Cabernet Sauvignon",
    description:
      "A refined red wine from Lebanon. Offers flavors of earth, blueberry, berries and is best described as Soft & Fruity.",
    price: 12.55,
    capacity: 0.75,
    grape: "Cabernet Sauvignon",
    closure: "Natural Cork",
    country: "Lebanon",
    characteristics: ["earth", "blueberry", "berries"],
    type: "Red",
    ABV: 12.0,
    region: "Lebanon",
    style: "Soft & Fruity",
    vintage: 2004,
  },
  {
    itemId: "7",
    title: "Hardys Stamp Chardonnay",
    description:
      "A refined white wine from Georgia. Offers flavors of blackberry, minerals, leather and is best described as Crisp & Zesty.",
    price: 33.0,
    capacity: 0.75,
    grape: "Chardonnay",
    closure: "Natural Cork",
    country: "Georgia",
    characteristics: ["blackberry", "minerals", "leather"],
    type: "White",
    ABV: 12.5,
    region: "Kvareli",
    style: "Crisp & Zesty",
    vintage: 2023,
  },
  {
    itemId: "8",
    title: "Hardys Stamp Rose",
    description:
      "A refined rose wine from Lebanon. Offers flavors of honey, fruit, leather and is best described as Crisp & Fruity.",
    price: 34.0,
    capacity: 0.75,
    grape: "Pinot Noir",
    closure: "Natural Cork",
    country: "Lebanon",
    characteristics: ["honey", "fruit", "leather"],
    type: "Rose",
    ABV: 13.5,
    region: "Lebanon",
    style: "Crisp & Fruity",
    vintage: 1998,
  },
  {
    itemId: "9",
    title: "Banrock Station Shiraz",
    description:
      "A refined red wine from Argentina, specifically the Mendoza region. Offers flavors of fruit, mushrooms, nuts and is best described as Savoury & Full Bodied.",
    price: 53.44,
    capacity: 0.75,
    grape: "Marsanne",
    closure: "Natural Cork",
    country: "Argentina",
    characteristics: ["fruit", "mushrooms", "nuts"],
    type: "Red",
    ABV: 11.5,
    region: "Mendoza",
    style: "Savoury & Full Bodied",
    vintage: 2016,
  },
  {
    itemId: "10",
    title: "Banrock Station Chardonnay",
    description:
      "A refined white wine from England, specifically the Hampshire region. Offers flavors of sweetness, spice, tropical fruit and is best described as Crisp & Zesty.",
    price: 7.0,
    capacity: 0.75,
    grape: "Chardonnay",
    closure: "Natural Cork",
    country: "England",
    characteristics: ["sweetness", "spice", "tropical fruit"],
    type: "White",
    ABV: 12.5,
    region: "Hampshire",
    style: "Crisp & Zesty",
    vintage: 2009,
  },
]


export const CatalogPage: React.FC<CatalogPageProps> = ({ category }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterOpen(prevState => !prevState); 
  };
  useEffect(() => {}, [category]);
  return (
    <article className={styles.catalog}>
      <Sidebar toggleFilterVisibility={toggleFilterVisibility} />
      <section className={styles.catalog__content}>
        <FilterForWine category={category} toggleFilterVisibility={toggleFilterVisibility} isFilterOpen={isFilterOpen} />
        <ul className={styles.cardsConteiner}>
          {wine.map(wine => (
            <li className={styles.card}>
              <ProductCard category={category} wine={wine} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
