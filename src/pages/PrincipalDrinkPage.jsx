import React from 'react';
import CardRecepies from '../components/CardRecepies';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function PrincipalDrinkPage() {
  return (
    <div>
      <Header title="Drinks" search />
      <CardRecepies />
      <FooterMenu />
    </div>
  );
}
