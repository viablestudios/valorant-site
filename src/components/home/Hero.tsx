"use client";
import Image from "next/image";
import { useStoreUI } from "@/components/store/StoreUI";
import styles from "./Hero.module.css";
export function Hero() {
 const {goToShop}=useStoreUI();
 return <section className={styles.hero} aria-labelledby="hero-title">
  <div className={styles.grid} aria-hidden="true"/><div className={styles.orbit} aria-hidden="true"/>
  <div className={styles.topline}><span>ENTER YOUR NEXT ERA</span><span>EST. 2026 / BUILT TO CLIMB</span></div>
  <h1 id="hero-title" className={styles.title}><span>PLAY BETTER.</span><span>RANK HIGHER.</span></h1>
  <div className={styles.character}><Image src="/images/characters/reyna-hero-remastered.webp" width={941} height={1672} priority unoptimized sizes="(max-width: 700px) 100vw, 740px" alt="Reyna surrounded by purple soul energy"/></div>
  <span className={styles.rail}>PEAKFORM // COMPETITIVE ADVANTAGE</span>
  <div className={styles.copy}><p className={styles.label}>LESS COPIUM.<br/>MORE PROGRESS.</p><p>Guides, training tools and gear for your next rank. No aim assist. Just assistance.</p><button className={styles.primary} onClick={()=>goToShop()}>SHOP DIGITAL PRODUCTS <span>↗</span></button></div>
  <div className={styles.side}><span className={styles.status}>● BUILT FOR THE CLIMB</span><p>Your next rank<br/>starts here.</p><a href="#improve" className={styles.explore}><span>↗</span> IMPROVE YOUR RANK</a></div>
  <div className={styles.band}>
   <button onClick={()=>goToShop('guides')}><span className={styles.symbol}>◎</span><span><strong>08 FIELD GUIDES</strong><small>Better habits. Sharper decisions.</small></span><span>↗</span></button>
   <button onClick={()=>goToShop('wallpapers')}><span className={styles.symbol}>⌘</span><span><strong>14 NEW PERSPECTIVES</strong><small>Upgrade your desktop.</small></span><span>↗</span></button>
   <button onClick={()=>goToShop('gear')}><span className={styles.avatars}><Image src="/images/agents/reyna.webp" width={40} height={40} alt=""/><Image src="/images/agents/skye.webp" width={40} height={40} alt=""/></span><span><strong>GEAR UP</strong><small>Make the setup yours.</small></span><span>↗</span></button>
  </div>
 </section>
}