const navbar = [
  {
    name: 'Contact',
    route: '#contact',
  },
  {
    name: 'View resume',
    route: `${import.meta.env.BASE_URL}resume.pdf`,
    download: true,
  },
  {
    name: 'Blog',
    route: 'https://allthedreamingthings.bearblog.dev/',
  },
]
 
export default navbar
