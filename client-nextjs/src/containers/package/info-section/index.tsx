import React, { Fragment } from 'react'
import { FaPlaneDeparture, FaCar, FaBed, FaCircleInfo } from 'react-icons/fa6'
import InfoItem from './info-item'

export default function InfoSection(): React.ReactNode {
  return (
    <Fragment>
      <hr />
      <section className="grid grid-cols-2 justify-between gap-12 items-center px-8 py-12 select-none">
        <InfoItem title={'Airplane'} icon={<FaPlaneDeparture size={20} />}>
          All flights departure will be conducted by boarding &#8202;
          <strong>Party Air</strong>
        </InfoItem>
        <InfoItem title={'Vehicle'} icon={<FaCar size={20} />}>
          All land journeys will be provided by &#8202;
          <strong>RanJourney</strong>
        </InfoItem>
        <InfoItem title={'Accomodation'} icon={<FaBed size={20} />}>
          All accommodations will be arranged by &#8202;
          <strong>Travelgen Co.</strong>
        </InfoItem>
        <InfoItem
          title={'Additional Information'}
          icon={<FaCircleInfo size={20} />}
        >
          All additional requests will incur extra charges
        </InfoItem>
      </section>
      <hr />
    </Fragment>
  )
}
