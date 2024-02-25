import React from 'react'
import Image from 'next/image'
import styles from './footer.module.css'
import travelgenLogo from '/public/travelgen-footer-logo.png'
import Container from '@/components/container'
import FooterInfo from './footer-info'

export default function Footer(): React.ReactNode {
  return (
    <footer className={`${styles.footer}`}>
      <Container size="lg">
        <div className="flex bg-white p-16">
          <figure>
            <Image
              src={travelgenLogo}
              alt="Travelgen Footer Logo"
              placeholder="blur"
              height={98}
              width={136}
            />
          </figure>

          <div className="flex-1 flex justify-between ml-[106px]">
            <FooterInfo
              title="Info"
              content={[
                {
                  label: 'About',
                  href: '/'
                },
                {
                  label: 'Contact Us',
                  href: '/'
                },
                {
                  label: 'Testimonies',
                  href: '/'
                }
              ]}
            />
            <FooterInfo
              title="Company"
              content={[
                {
                  label: 'Terms & Conditions',
                  href: '/'
                },
                {
                  label: 'Privacy Agreements',
                  href: '/'
                },
                {
                  label: 'Blog',
                  href: '/'
                },
                {
                  label: 'Help Desk',
                  href: '/'
                }
              ]}
            />
            <FooterInfo
              title="Contact"
              content={['Jakarta, Indonesia', 'diazlinggaputra@gmail.com']}
            />
          </div>
        </div>
      </Container>

      <div className="bg-blue-100 p-3">
        <p className="text-heading-5 text-white font-bold text-center">
          Copyright &copy; {new Date().getFullYear()} Diaz Linggaputra. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
