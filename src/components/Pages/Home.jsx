import React, { useEffect, useState } from 'react'
import { pageTitle } from '../../helper'
import Hero from '../Hero'
import Section from '../Section'
import SectionHeading from '../SectionHeading'
import Spacing from '../Spacing'
import Countdown from '../countdown'
import CardStype3 from '../Card/CardStype3'
import StatusPop from '../Status'

export default function Home() {
  pageTitle('NFA');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const targetDate = new Date('2023-07-25T12:00:00').getTime();

  const [popup, setPopup] = useState(false);
  const [txData, setTxData] = useState('');

  const handlePopup = (tx) => {
    if (tx) {
      setTxData(tx);
      setPopup(true);
    }
  }

  return (
    <>
      <Hero
        title='NFT FRIENDS <br/> ALPHA'
        mintNumber={`${243}`}
        mintMax='777'
        mintPrice='0.2'
        mintDeathLine=' 31 August'
        bgUrl='/images/hero_img_3.jpeg'
        heroImageUrl='/images/hero_img_1.png'
        animatedUrl='/images/hero_img_sm.png'
        variant='cs-type1'
        bubble
      />
      <Spacing lg='50' md='50' />
      <Section id="claim" className="container">
        <Section className="cs-right_space_40">
          <SectionHeading
            title='Claim/Reserve Instructions'
            subtitle='Simple Steps'
          />
        </Section>
        <Spacing lg='50' md='50' />
        <Section className="row">
          <Section className="col-xl-3">
            <CardStype3
              title='Connect Your Discord'
            />
            <Section className="cs-height_25 cs-height_lg_25"></Section>
          </Section>
          <Section className="col-xl-3">
            <CardStype3
              title='Connect Your Wallet'
            />
            <Section className="cs-height_25 cs-height_lg_25"></Section>
          </Section>
          <Section className="col-xl-3">
            <CardStype3
              title='Confirm Your Transaction'
            />
            <Section className="cs-height_25 cs-height_lg_25"></Section>
          </Section>
          <Section className="col-xl-3">
            <CardStype3
              title='Reserve Your Precious Pass'
            />
            <Section className="cs-height_25 cs-height_lg_25"></Section>
          </Section>
        </Section>
      </Section>
      <Section className="container">
        <Section className="row">
          <Section className="col-xl-5.7 col-md-6 ">
            <Section className='cs_size-23 cs-light_bg text-center cs-card cs-style3 cs-radius_10'>
              <Section tag='p' style={{ color: '#00d4ff' }}>{`Total Supply: 777`}</Section>
            </Section>
            <Spacing lg='25' md='25' />
            <Section className='cs_size-23 cs-light_bg text-center cs-card cs-style3 cs-radius_10'>
              <Section tag='p' style={{ color: '#00d4ff' }}>{'Price :  O.2 ETH'}</Section>
            </Section>
            <Spacing lg='25' md='25' />
            <Section className='cs_size-23 cs-light_bg text-center cs-card cs-style3 cs-radius_10'>
              <Section tag='p' style={{ color: '#00d4ff' }}>{`Supply Left: ${777 - (243)}`}</Section>
            </Section>
          </Section>
          <Section className="col-lg-6 cs-card cs-style3 ">
            <Section className='cs-light_bg text-center cs-radius_10'>
              <Spacing lg='25' md='25' />
              <Countdown onTransactionComplete={handlePopup} />
              <Spacing lg='25' md='25' />
            </Section>
          </Section>
        </Section>
      </Section>
      {popup && <StatusPop tx={txData} />}
    </>
  )
}