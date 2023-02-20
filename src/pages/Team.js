import '../styles/Team.css';
import { Nav } from "../components/Nav"
// Meet The Team Page

export const Team = () => {
    return(
        <div className="team-page">
            <Nav/>
            <div className="team-main-container">
                <h1>
                    Meet The Team
                </h1>
                <div className='team-card-container'>
                    <div className='team-member-card'>
                        <img 
                        src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
                        alt="member-pfp"
                        className='member-pfp'
                        />
                        <p className='member-name'>
                            Tung Tze Yang
                        </p>
                        <ul className='member-role'>
                            <li>
                                Founder
                            </li>
                            <li>
                                Team Leader
                            </li>
                            <li>
                                Hardware Developer
                            </li>
                        </ul>
                        <ul className='member-social'>
                              <a 
                                href="https://www.linkedin.com/in/tung-tze-yang-6a0a391a8/"
                                rel="noreferrer"
                                target="_blank"
                              >
                                <img src={require('../assets/linkedin.png')}
                                alt="linkedin-logo"
                                />
                              </a>
                        </ul>
                    </div>
                    <div className='team-member-card'>
                        <img 
                        src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
                        alt="member-pfp"
                        className='member-pfp'
                        />
                        <p className='member-name'>
                            Wong Yen Hong
                        </p>
                        <ul className='member-role'>
                            <li>
                                Team Member
                            </li>
                            <li>
                                Software Developer
                            </li>
                        </ul>
                        <ul className='member-social'>
                              <a 
                                href="https://www.linkedin.com/in/wong-yen-hong/"
                                rel="noreferrer"
                                target="_blank"
                              >
                                <img src={require('../assets/linkedin.png')}
                                alt="linkedin-logo"
                                />
                              </a>
                              <a 
                                href="https://github.com/wyhong3103"
                                rel="noreferrer"
                                target="_blank"
                              >
                                <img src={require('../assets/github.png')}
                                alt="github-logo"
                                />
                              </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}