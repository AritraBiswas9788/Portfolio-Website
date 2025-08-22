import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BsArrowUpRight } from "react-icons/bs";

const socials = [
  {icon: <FaGithub className='w-5 h-5'/>, path: 'https://github.com/AritraBiswas9788'},
  {icon: <FaLinkedin className='w-5 h-5'/>, path: 'https://www.linkedin.com/in/aritra-biswas-398b95250'},
  {icon: <BsArrowUpRight className='w-5 h-5'/>, path: 'https://www.freelancer.in/u/aritrabiswas9788'},

];
const Socials = ({containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
      {socials.map((social, index) => {
        return <Link key={index} href={social.path} className={iconStyles}>
          {social.icon}
        </Link>;
      })}
    </div>
  )
}

export default Socials
