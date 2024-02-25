import React from 'react'
import Image from 'next/image'
import styles from './footer.module.css'
import travelgenLogo from '/public/travelgen-footer-logo.png'
import Container from '@/components/container'

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
