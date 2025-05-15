import { GiMoneyStack } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaGift, FaSackDollar } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaHome, FaShoppingCart, FaDotCircle } from "react-icons/fa";

const iconMapping = {
  salary: <GiMoneyStack size={20} />,
  bonus: <FaSackDollar size={20} />,
  freelance: <SiFreelancer size={20} />,
  part_time_job: <MdOutlineWorkHistory size={20} />,
  food: <IoFastFoodSharp />,
  grocery: <FaShoppingCart size={20} />,
  rental_income: <FaHome size={20} />,
  gift: <FaGift size={20} />,
  other: <FaDotCircle size={20} />,
};

export default iconMapping;
