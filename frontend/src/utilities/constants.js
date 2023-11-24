import { FaRegUser } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbTools } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";

const MAX_SKILLS = 12;

const cardTypes = [
    'Profile',
    'Companies and Roles',
    'Education',
    'Side Projects',
    'Hobbies and Clubs',
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

const stopWords = [
  'in',
  'on',
  'to',
  'and',
  'the',
  'a',
  'with',
  'for'
];

const menuItems = [
  {
    label: 'Dashboard',
    route: '/',
    element: 'HomePage'
  },
  {
    label: 'Companies and roles',
    route: '/companies',
    element: 'CompaniesPage'
  },
  {
    label: 'Education',
    route: '/education',
    element: 'EducationPage'
  },
  {
    label: 'Side projects',
    route: '/projects',
    element: 'ProjectsPage'
  },
  {
    label: 'Hobbies and clubs',
    route: '/hobbies',
    element: 'HobbiesPage'
  },
  {
    label: 'Experience',
    route: '/experience',
    element: 'ExperiencePage'
  },
];

export { cardTypes, iconMap, MAX_SKILLS, stopWords, menuItems }