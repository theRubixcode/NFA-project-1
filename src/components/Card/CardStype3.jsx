import React from 'react'
import Section from '../Section'

export default function CardStype3({ number, title }) {
  return (
    <Section className="cs-card cs-style3 text-center cs-light_bg">
      <Section className="cs-card_in">
        <Section tag='h3' className="cs-card_title cs-font_20 cs-font_10_sm cs-m0 cs-primary_color">{title}</Section>
      </Section>
    </Section>
  )
}
