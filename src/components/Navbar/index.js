import {Component} from 'react'
import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'

import {BsFillPersonFill} from 'react-icons/bs'

import {FaMusic} from 'react-icons/fa'

import {MdOutlineQueueMusic} from 'react-icons/md'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <div className="iconDiv">
        <img
          src="https://res.cloudinary.com/dv99gbfxa/image/upload/v1633614738/Vector_ap7buz.jpg"
          alt="logo"
          className="logo"
        />

        <div className="iconCon">
          <BsFillPersonFill className="icons" />
          <p className="iconsT">profile</p>
          <Link to="/">
            <IoMdHome className="icons" />
          </Link>
          <p className="iconsT">Home</p>
          <FaMusic className="icons" />
          <p className="iconsT">Music</p>
          <MdOutlineQueueMusic className="icons" />
          <p className="iconsT">playlists</p>
        </div>
      </div>
    )
  }
}

export default Navbar
