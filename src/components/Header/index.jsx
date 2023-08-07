import React, { useContext, useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { Link, redirect } from 'react-router-dom';
import Modal from '../Modal';
import ModeSwitch from '../ModeSwitch';
import Section from '../Section';
import './header.scss'
import { walletContext } from '../../contexts/walletContext'
import { DiscordAuthContext, SignInButton, SignOutButton, UserInfo } from "../../contexts/discordContext";


export default function Header() {
  const { account } = useContext(walletContext)
  const { handleCallback } = useContext(DiscordAuthContext);

  useEffect(() => {
    const params = window.location.search;
    const code = params.slice(6);

    if (code) {
      handleCallback(code);
    }
  }, [])

  return (
    <>
      <Section tag='header' className="cs-site_header cs-style1 cs-sticky-header cs-primary_color">
        <Section className="cs-main_header">
          <Section className="container">
            <Section className="cs-main_header_in">
              <Section className="cs-main_header_left">
                <Link to='/' className="cs-site_branding cs-accent_color">
                  <img src="/images/logo.svg" alt="Logo" className="cs-hide_dark" />
                  <img src="/images/logo_white.svg" alt="Logo" className="cs-hide_white" />
                </Link>
              </Section>
              <Section className="cs-main_header_center">
              </Section>
              <Section className="cs-main_header_right">
                <Section className="cs-toolbox">
                  <ModeSwitch />
                  {account === '' ?
                    <Modal modalType='connect' btnText='Connect' btnIcon /> :
                    <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
                      <Icon icon="ion:wallet-outline" />
                      <Section tag='span'>{`${account.substring(0, 5)}...${account.substring(account.length - 4, account.length)}`}</Section>
                    </Section>}
                </Section>
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </>
  )
}