import { useState } from "react";
import { Panel } from "primereact/panel";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import ProductCard from "./ProductCard";
import { description } from "platform";

export default function ProductsList({ config }) {
    const [layout, setLayout] = useState("list");

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between align-items-center`;

        return (
            <div className={className}>
                <span>
                    <b>45 {config.title}</b>
                </span>
                {config.multiple_list_style && (
                    <DataViewLayoutOptions
                        layout={layout}
                        onChange={(e) => setLayout(e.value)}
                    />
                )}
            </div>
        );
    };

    const listTemplate = (products, layout) => {
        return (
            <div className="grid grid-nogutter">
                {products.map((product, index) => {
                    return (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            layout={layout}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <Panel headerTemplate={headerTemplate} className="mt-3">
            <DataView
                value={[
                    {
                        id: 1,
                        name: "ChatGPT Complete Guide: Learn actionable",
                        image: "https://placehold.co/100x100/black/FFFFFF/png",
                        price: 99,
                        description:
                            "Learn how AI transforms industries with actionable strategies for professionals.",
                        inventoryStatus: "fresd",
                        category: "cat1",
                        courses: [{}, {}],
                        discount: 10,
                        totalHours: 12,
                        lectures: 50,
                    },
                    {
                        id: 2,
                        price: 175,
                        name: "React Pro Guide",
                        description:
                            "Everything you need to know about React. Beginner to expert in one course.",
                        image: "https://placehold.co/100x100/pink/FFFFFF/png",
                        inventoryStatus: "awd",
                        category: "cat2",
                        totalHours: 15,
                        lectures: 60,
                    },
                    {
                        id: 768,
                        name: "ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More",
                        description:
                            "A comprehensive guide to mastering server-side rendering with Next.js.",
                        image: "https://placehold.co/100x100/black/FFFFFF/png",
                        price: 130,
                        inventoryStatus: "fresd",
                        category: "cat1",
                        discount: 10,
                        totalHours: 10,
                        lectures: 45,
                    },
                    {
                        id: 56745,
                        price: 200,
                        name: "Tailwind CSS Advanced",
                        description:
                            "Design stunning UIs with minimal effort using Tailwind CSS.",
                        image: "https://placehold.co/100x100/pink/FFFFFF/png",
                        inventoryStatus: "awd",
                        category: "cat2",
                        totalHours: 8,
                        lectures: 35,
                    },
                    {
                        id: 5674,
                        name: "Understand the fundamentals of cloud platforms like AWS and Azure.",
                        image: "https://placehold.co/100x100/black/FFFFFF/png",
                        price: 80,
                        description:
                            "Understand the fundamentals of cloud platforms like AWS and Azure.",
                        inventoryStatus: "fresd",
                        category: "cat1",
                        totalHours: 20,
                        lectures: 75,
                    },
                    {
                        id: 456,
                        price: 150,
                        name: "JavaScript Essentials",
                        image: "https://placehold.co/100x100/pink/FFFFFF/png",
                        description:
                            "Master JavaScript with real-world examples and projects.",
                        inventoryStatus: "awd",
                        category: "cat2",
                        totalHours: 18,
                        lectures: 65,
                    },
                    {
                        id: 56,
                        name: "Python for Beginners",
                        image: "https://placehold.co/100x100/black/FFFFFF/png",
                        price: 75,
                        description:
                            "Get started with Python programming with simple examples and projects.",
                        inventoryStatus: "fresd",
                        category: "cat1",
                        totalHours: 14,
                        lectures: 50,
                    },
                    {
                        id: 45,
                        price: 180,
                        name: "Full Stack Development",
                        image: "https://placehold.co/100x100/pink/FFFFFF/png",
                        description:
                            "A roadmap to becoming a proficient full-stack developer.",
                        inventoryStatus: "awd",
                        category: "cat2",
                        totalHours: 25,
                        lectures: 100,
                    },
                    {
                        id: 32,
                        name: "UI/UX Design Basics",
                        image: "https://placehold.co/100x100/black/FFFFFF/png",
                        price: 65,
                        description:
                            "Learn how to design user-friendly interfaces and improve user experiences.",
                        inventoryStatus: "fresd",
                        category: "cat1",
                        totalHours: 10,
                        lectures: 40,
                    },
                    {
                        id: 22,
                        price: 250,
                        name: "Advanced DevOps",
                        image: "https://placehold.co/100x100/pink/FFFFFF/png",
                        description:
                            "Streamline your development process with advanced DevOps practices.",
                        inventoryStatus: "awd",
                        category: "cat2",
                        totalHours: 30,
                        lectures: 120,
                    },
                ]}
                listTemplate={listTemplate}
                layout={layout}
                paginator
                rows={config.items_per_page}
            />
        </Panel>
    );
}
