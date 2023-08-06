import React, { useContext } from 'react'
import { Parallax } from 'react-parallax';
import parse from 'html-react-parser';
import Button from '../Button';
import './hero.scss'
import Section from '../Section';
import { Link } from 'react-scroll';
import { fruitlistStat, friendlistStat, _claimStatus } from '../../utils/web3'

// import Modal from '../Modal';
import { walletContext } from '../../contexts/walletContext'
import { toast } from 'react-toastify';


export default function Hero({ title, mintNumber, mintMax, mintPrice, mintDeathLine, bgUrl, heroImageUrl, variant, bubble, overlay, bgOpacity }) {
  const { account } = useContext(walletContext)

  const handleStatus = async () => {

    if (!account) {
      toast.info('Connect your wallet first!');
    }

    toast.loading('Your status is checking! please wait...');

    let fruitStatus = await fruitlistStat(account);
    let friendStatus = await friendlistStat(account);
    let claimed = await _claimStatus(account);

    if (claimed) {
      toast.dismiss();
      toast.success('You have already claimed!');
      return;
    } else if (fruitStatus || friendStatus) {
      toast.dismiss();
      toast.success('You are eligible!');
      return;
    } else {
      toast.dismiss();
      toast.error('You are not eligible!');
      return;
    }
  }

  return (

    <Section tag='section' className={`cs-hero cs-style1 ${variant ? variant : ''}`} id="hero" >
      {overlay && <Section className="cs-dark_overlay" style={{ opacity: overlay }} />}
      <Section className="cs-hero_bg" style={{ opacity: bgOpacity }}>
        <Parallax bgImage={bgUrl} bgImageAlt="Hero" strength={120}></Parallax>
      </Section>
      <Section className="container">
        <Section className="cs-hero_text">
          <Section tag='h2' className="cs-hero_secondary_title cs-font_18 cs-font_16_sm">{mintNumber} / {mintMax}&nbsp; Claimed</Section>
          <Section tag='h1' className="cs-hero_title cs-font_40 cs-font_20_sm cs-bold">{parse(title)}</Section>
          <Section className="cs-btn_group">

            <Link to='claim' smooth={true} duration={500}>
              <Button btnText={'Claim Now'} variant='cs-color1'></Button>
            </Link>

            <span onClick={handleStatus}>
              <Section tag='span' className="cs-btn cs-btn_filed cs-accent_btn">
                <Section tag='span'>Check Status</Section>
              </Section>
            </span>

          </Section>
          <Section tag='h3' className="cs-hero_subtitle cs-font_18 cs-font_16_sm cs-body_line_height">Price =<Section tag='span' className="cs-accent_color">{mintPrice}</Section> ETH <br />
            Presale is Live Until <Section tag='span' className="cs-accent_color">{mintDeathLine}</Section></Section>
        </Section>
        <Section className="cs-hero_img">
          <img src={heroImageUrl} alt="Hero" />
        </Section>
      </Section>
      {bubble && (
        <Section id="background-wrap">
          <Section className="bubble x1"></Section>
          <Section className="bubble x2"></Section>
          <Section className="bubble x3"></Section>
          <Section className="bubble x4"></Section>
          <Section className="bubble x5"></Section>
          <Section className="bubble x6"></Section>
          <Section className="bubble x7"></Section>
          <Section className="bubble x8"></Section>
          <Section className="bubble x9"></Section>
          <Section className="bubble x10"></Section>
        </Section>
      )}

    </Section>
  )
};