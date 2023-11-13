import { FaRegUser } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbTools } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";

const MAX_SKILLS = 9;

const cardTypes = [
    'Profile',
    'Companies and Roles',
    'Education',
    'Side Projects',
    'Hobbies & Clubs',
    'Skills'
  ]

const iconMap = {
    0: FaRegUser,
    1: BsBriefcase,
    2: IoSchoolOutline,
    3: HiOutlineClipboardDocumentList,
    4: GrGroup,
    5: TbTools
  };

export { cardTypes, iconMap, MAX_SKILLS };