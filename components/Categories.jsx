import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {getCategories} from "../services";


export const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        }).catch((error) => console.log(error));
    }, []);


    return (
        <div className={"bg-white shadow-lg rounded-lg p-8 mb-8"}>
            <h3 className={"text-xl mb-8 font-semibold border-b pb-4"}>
                Kategóriák
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="cursor-pointer block pb-3 mb-3">
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
    );
};


