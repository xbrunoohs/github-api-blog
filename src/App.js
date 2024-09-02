import React, { useEffect, useState } from 'react';
import './App.css';
import githubLogo from './assets/githubinv.svg';

function App() {
  const username = 'xbrunoohs';
  const repository = 'flow-events';
  const userUrl = `https://api.github.com/users/${username}`;
  const issuesUrl = `https://api.github.com/repos/${username}/${repository}/issues`;

  const [userData, setUserData] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    //Fetch para user data
    fetch(userUrl)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching user data:', error));

    //Fetch para issues data
    fetch(issuesUrl)
      .then(response => response.json())
      .then(data => {
        setIssues(data);
      })
      .catch(error => console.error('Error fetching issues data:', error));
  }, [userUrl, issuesUrl]);

  return (
    <div className="App">
      <div className="profile-info">
        <img id="user-avatar" src={userData.avatar_url} alt="Imagem do perfil" width="150" height="150" />
        <h1 id="user-name">{userData.name}</h1>
        <p id="user-followers">
          Seguidores: {userData.followers} &nbsp;&nbsp;  &nbsp;&nbsp; Seguindo: {userData.following} &nbsp;&nbsp;  &nbsp;&nbsp; Repositórios: {userData.public_repos}
        </p>
      </div>

      <div id="github-img-section">
        <img className="github-img" src={githubLogo} alt="GitHub Logo" width="4%" />
      </div>

      <div id="issues-container">
        <h2 className="issues">flow-events issues</h2>
        {issues.map(issue => (
          <div key={issue.id} className="post">
            <h3>{issue.title}</h3>
            <p><strong>ID:</strong> {issue.id}</p>
            <p><strong>Status:</strong> {issue.state}</p>
            <p><strong>Descrição:</strong> {issue.body ? issue.body.substring(0, 100) + '...' : 'Sem descrição'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
