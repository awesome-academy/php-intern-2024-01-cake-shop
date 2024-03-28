import { Card, Image } from 'antd';
import React from 'react';
import img from '@/img/no_image.png';
import { formatCurrencyVN } from '../FormatCurrency';
import { Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
export default function ListItemInCategory({ items }) {
    const [t] = useTranslation();
    const data = items.slice(0, 5);
    const categoryName = data[0].type;
    var content = [];
    data.map((e) => {
        const imgLink = e.img_id
            ? route('api.image.show', {
                  picture: e.img_id
              })
            : img;
        content.push(
            <Card
                hoverable
                style={{
                    width: '240px'
                }}
                cover={
                    <Image
                        style={{
                            width: '240px',
                            height: '200px',
                            objectFit: 'cover'
                        }}
                        alt={e.name}
                        src={imgLink}
                    />
                }
            >
                <Card.Meta
                    style={{
                        width: '100%',
                        height: '30%'
                    }}
                    title={
                        <div
                            className=" w-[200px] text-center"
                            onClick={() => {
                                location.assign(
                                    route('cakes.show', {
                                        cake: e.id
                                    })
                                );
                            }}
                        >
                            <h5 className=" font-bold">{e.name}</h5>
                        </div>
                    }
                    description={
                        <div className=" w-full min-w-[100px] text-lg text-red-500 font-bold text-center">
                            {formatCurrencyVN(e.price)}
                        </div>
                    }
                />
            </Card>
        );
    });

    return (
        <div className="mb-[20px] max-w-[1400px] md:max-w-none sm:max-w-none">
            <div className=" flex justify-between max-w-[1400px]">
                <h3 className=" text-[16px] font-[600] uppercase px-[10px] py-[9px] bg-[#b5145a] text-white w-fit rounded-[20px]">
                    {categoryName}
                </h3>
                <Link
                    href={route('cake-types.show', {
                        cakeType: items[0].type_id
                    })}
                    className="mr-[30px] text-black hover:text-[#b5145a] hover:no-underline text-[16px] hover:font-bold"
                >
                    {t('ViewMore')}
                </Link>
            </div>
            <div className="flex overflow-auto space-x-10 max-w-[500px] md:max-w-none sm:max-w-none md:w-full sm:w-full">
                {content}
            </div>
        </div>
    );
}
