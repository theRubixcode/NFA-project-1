import React, { createContext, useContext } from 'react';
import { Icon } from '@iconify/react';
import Section from '../components/Section';


export const DiscordAuthContext = createContext();

export const DiscordAuth = ({ children }) => {

  const handleSignIn = () => {
    // Replace these values with your own
    const clientID = process.env.clientID;
    const redirectURI = process.env.redirectURI;

    // Generate the authorization URL
    const authorizationURL = `https://discord.com/api/oauth2/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=identify`;

    // Redirect the user to the authorization URL
    window.location.href = authorizationURL;
  };

  const handleCallback = (code) => {

    const clientID = process.env.clientID;
    const clientSecret = process.env.clientSecret;
    const redirectURI = process.env.redirectURI;

    // Exchange the authorization code for an access token
    fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientID,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectURI,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const accessToken = data.access_token;

        // Use the access token to fetch the user's information
        return fetch('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        const memberId = data.id;
        return fetch(`https://discord-role.cyclic.app/add-role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ memberId })
        })
      })
      .catch(err => console.log(err));
  };

  return (
    <DiscordAuthContext.Provider
      value={{ handleSignIn, handleCallback }}
    >
      {children}
    </DiscordAuthContext.Provider>
  );
};

export const roleClaimButton = () => {
  const { handleSignIn } = useContext(DiscordAuthContext);

  return (
    <>
      <span onClick={handleSignIn}>
        <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
          <Icon icon="iconoir:discord" />
          <Section tag='span'>Claim Discord Role</Section>
        </Section>
      </span>
    </>
  );
};