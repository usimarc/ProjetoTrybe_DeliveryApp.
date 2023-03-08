import { useEffect, useState } from 'react';
import { requestData } from '../../utils/apiConnection';
import Navbar from '../../customers/components/navBar';
import SaleCard from '../components/sale';

function SellerOrder() {
  const [name, setName] = useState('');
  const [sales, setSales] = useState([]);

  const setNameFunc = () => {
    const getName = JSON.parse(localStorage.getItem('user'));
    if (getName) {
      setName(getName.name);
    }
  };

  useEffect(() => {
    requestData('/sales')
      .then((response) => {
        setSales(response);
      });
    setNameFunc();
  }, []);

  return (
    <div>
      <Navbar name={ name } />
      {sales.map((item) => (
        <SaleCard
          props={ item }
          key={ item.id }
        />
      ))}
    </div>
  );
}

export default SellerOrder;
