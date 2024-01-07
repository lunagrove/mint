import { FaRegUser } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { IoSchoolOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { TbTools } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";

const MAX_SKILLS = 18;
const MAX_EDUCATION = 2;
const MAX_SNIPPETS = 3;
const MAX_COMPANIES = 2;
const MAX_HOBBIES = 2;
const MAX_PROJECTS = 2;

const cardTypes = [
  'Profile',
  'Companies',
  'Education',
  'Side Projects',
  'Hobbies',
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
  'an',
  'i',
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
  {
    label: 'Resume Builder',
    route: '/resume',
    element: 'ResumePage'
  },
];

const cardConfig = {
  0: { to: '', heading: 'Add introduction statements'},
  1: { to: '/companies', heading: 'Add companies and roles' },
  2: { to: '/education', heading: 'Add educational institutions, courses, and credentials' },
  3: { to: '/projects', heading: 'Add side projects' },
  4: { to: '/hobbies', heading: 'Add hobbies and clubs' },
  5: { to: '', heading: 'Add skills' },
};

const tips = [
  {
    title: 'Tip 1',
    filename: 'Tip1.md',
  },
  {
    title: 'Tip 2',
    filename: 'Tip2.md',
  },
  {
    title: 'Show all history',
    filename: 'Tip3.md',
  }
];

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const educationTypes = [
  'course', 'credential'
];

const resumeTemplates = [
  {
    caption: 'Template 1',
    component: 'ResumeTemplate1'
  },
  {
    caption: 'Template 2',
    component: 'ResumeTemplate2'
  }
]

export { cardTypes, iconMap, MAX_SKILLS, stopWords, menuItems, cardConfig, MAX_EDUCATION, MAX_SNIPPETS, MAX_COMPANIES, MAX_HOBBIES, MAX_PROJECTS, tips, monthNames, weekDays, educationTypes,
resumeTemplates }