'use client'

import { ProductItemCard } from "@/components/ecommerce/itemCard/itemCard";
import { useCart } from "@/hooks/cart/useCart";
import { useProductCustomerList } from "@/hooks/product/useProduct";
import { Button, Carousel, ConfigProviderProps, Radio, RadioChangeEvent } from "antd";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useState } from "react";


export default function Home() {
  // useGoogleOneTapLogin({
  //   onSuccess: credentialResponse => {
  //     console.log(credentialResponse);
  //   },
  //   onError: () => {
  //     console.log('Login Failed');
  //   },
  // });

  return (
    <>
      <SectionOne />
      <div className="p-body">
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
    </>
  );
}

const SectionOne = () => {
  return <div className={`
    h-[50vh] bg-gray-500 p-body text-white flex items-center justify-center 
    bg-[url("/img/coffee/coffee-1.jpeg")] bg-cover bg-center bg-opacity-10
  `}
  >
    <h3>Welcome to our store</h3>
  </div>
}

const SectionTwo = () => {
  return <div className={`
    h-[80vh]
    grid grid-cols-2 gap-3 p-b-body 
    
  `}
  >
    <div className={`bg-gray-500 rounded-[2em] shadow-lg bg-[url("/img/coffee/coffee-4.jpeg")] bg-cover bg-opacity-10`}></div>
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className={`rounded-[2em] shadow-lg bg-[#BD7D5F] bg-cover 
          font-bold font-anton text-xl uppercase ps-6 pt-8`}>
          Good Morning
        </div>
        <div className={`rounded-[2em] shadow-lg bg-[#9c6247] bg-cover`}></div>
      </div>
      <div className={`bg-gray-500 rounded-[2em] shadow-lg bg-[url("/img/coffee/coffee-2.jpeg")] bg-cover bg-opacity-10`}></div>
    </div>
  </div>
}

type SizeType = ConfigProviderProps['componentSize'];

const SectionThree = () => {
  const [size, setSize] = useState<SizeType>('middle');

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const { data } = useProductCustomerList();
  const { cartList, toggleItemToCart } = useCart();

  return <div className="h-fit p-y-body">
    <div className="grid grid-cols-2 pb-5 h-[10vh]">
      <div className="ps-5 pb-5">
        <div className="text-lg font-bold pb-5">
          Our products
        </div>
        <div className="">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button className="me-2 rounded-lg"
              value="large">
              Large
            </Radio.Button>
            <Radio.Button className="me-2 rounded-lg before:w-0"
              value="middle">
              Default
            </Radio.Button>
            <Radio.Button className="me-2 rounded-lg before:w-0"
              value="small">
              Small
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
      <div className="text-sm">
        This is our new product collections in this month
      </div>
    </div>
    <div className="h-[40vh]">
      <Carousel arrows infinite={true} slidesToShow={4}>
        {cartList && data?.pageData.map((item, _index) => (
          <ProductItemCard
            key={_index}
            code={item.code}
            title={item.name}
            price={item.price}
            onAddToCartClick={() => toggleItemToCart(item)}
            isAddedToCart={cartList.filter(i => i.code == item.code).length > 0}
            image={`bg-[url("/img/leaf-bg-2.jpg")] bg-cover bg-opacity-10`} />
        ))}
      </Carousel>
    </div>
    <div className={`my-[3em] bg-[url("/img/coffee/coffee-1.jpeg")] 
      bg-cover bg-center bg-opacity-50 h-[20vh]`}></div>
  </div>
}

const SectionFour = () => {
  return (
    <div className={`grid grid-cols-2 gap-5 h-[80vh]`}>
      <div>
        <div className="text-lg font-bold py-5 flex flex-row capitalize">
          <div className="text-[2em] text-semi-dark">New Section</div>
          <div className="ms-auto">
            <Button className={`rounded-full px-[1em] py-[1.5em]`}>
              <CaretLeft size={20} />
            </Button>
            <Button className={`ms-3 rounded-full px-[1em] py-[1.5em]`}>
              <CaretRight size={20} />
            </Button>
          </div>
        </div>
        <div className={`bg-gray-500 rounded-[1.5em] min-h-[55%] bg-[url("/img/leaf-bg-2.jpg")] bg-cover bg-opacity-10`}></div>
      </div>
      <div>
        <div className={`bg-gray-500 rounded-[1.5em] min-h-[55%] bg-[url("/img/leaf-bg-1.jpg")] bg-cover bg-opacity-10`}></div>
        <div className="py-3 text-semi-dark">
          Discover our new summer collection now!
          Experience fresh styles and designs, perfect for updating your
          wardrobe with the lastest trends!
        </div>
        <Button>Shopping Now</Button>
      </div>
    </div>
  )
}

