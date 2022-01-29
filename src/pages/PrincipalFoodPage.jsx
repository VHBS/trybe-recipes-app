import React from 'react';
import CardRecepies from '../components/CardRecepies';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';

export default function PrincipalFoodPage() {
  return (
    <div>
      <Header title="Foods" search />
      <CardRecepies />
      <FooterMenu />
    </div>
  );
}
