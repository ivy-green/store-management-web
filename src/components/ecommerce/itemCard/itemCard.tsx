'use client'

import { useCart } from '@/hooks/cart/useCart';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Star } from 'phosphor-react';

interface ItemCard1Props {
  code?: number,
  title?: string,
  image?: string,
  price?: number,
  rate?: number,
  onAddToCartClick?: () => void
  isAddedToCart?: boolean
}

export function ProductItemCard(props: ItemCard1Props) {
  const {
    code, title, price, rate, image,
    onAddToCartClick, isAddedToCart = false
  } = props
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '35vh',
    lineHeight: '160px',
    textAlign: 'center',
  };
  const { cartList } = useCart();
  const router = useRouter()

  return (
    <div className={`cursor-pointer hover:bg-gray-200 transition-all duration-75 px-3 pt-3 pb-5 rounded-sm`}
      style={contentStyle} onClick={() => {
        router.push(`/customer/product/${code}`)
      }}>
      <div
        className={`rounded h-[70%]
            ${(typeof image != "undefined" ? image : "bg-gray-500")}`}
      />
      <div className='h-auto flex flex-col text-center items-center justify-center font-semibold'>
        <div className="text-xl text-semi-dark">{title ?? "product"}</div>
        <div className="pt-1 text-sm flex flex-row items-center justify-center">
          <div className="text-sm text-semi-dark">{price ?? 0}</div>
          <Star
            weight={`fill`}
            size={20}
            color={`#eebf04`} />
          <div className="ms-2 text-semi-dark">({rate ?? 0}k)</div>
        </div>
        {cartList && onAddToCartClick && (
          <Button
            onClick={onAddToCartClick}
            className={`rounded-full mt-4 w-fit px-6 font-semibold 
            ${isAddedToCart ? "bg-blue-500 text-white" : "bg-orange-500 text-white"}`}>
            {isAddedToCart ? "Remove from Cart" : "Add to Cart"}
          </Button>)}
      </div>
    </div>
  )
}
