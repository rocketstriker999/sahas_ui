import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import Brand from "./Brand/Brand";
import { Badge } from 'primereact/badge';
import { useSelector } from 'react-redux';
import useAPI from '../../hooks/useAPI';


export default function Navbar() {

    const currentLoggedInUser = useSelector((state) => state.stateAuth.user);
    const navigate = useNavigate();

    const [productCategories, isLoadingProductCategories, errorProductCategories ] = useAPI({ requestPath: "ui-config/product-categories" });

    const itemRenderer = (item) => (
        <NavLink to={item.to} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </NavLink>
    );


    const items = [

        {
            label: 'Courses',
            icon: 'pi pi-fw pi-book',
            items: productCategories.map(category => {
                return {
                    label: category.categoryName,
                    icon: 'pi pi-fw pi-sign-in',
                }
            })
        },

        {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            command: () => navigate('/login'),
            visible: !currentLoggedInUser

        },
        {
            label: 'Your Firm',
            icon: 'pi pi-fw pi-cog',
            command: () => navigate('/manage-firm'),
            visible: currentLoggedInUser && (currentLoggedInUser.role === 'FADMIN' || currentLoggedInUser.role === 'HADMIN')

        },
        {
            label: 'Manage Firms',
            icon: 'pi pi-fw pi-prime',
            command: () => navigate('/manage-firm'),
            visible: currentLoggedInUser && currentLoggedInUser.role === 'HADMIN'

        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-envelope',
            command: () => navigate('/contact'),
            visible: !currentLoggedInUser

        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question-circle',
            command: () => navigate('/help'),
            visible: currentLoggedInUser

        },
        {
            label: 'Notification',
            icon: 'pi pi-bell',
            badge: 3,
            template: itemRenderer,
            to: '/notifications',
            visible: currentLoggedInUser
        },
    ];

    const end =
        <div className="flex align-items-center gap-3">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            {currentLoggedInUser ? (<NavLink to='/profile'><Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /></NavLink>) : null}
        </div>


    return (
        <Menubar className='px-4 shadow-3 z-5 relative' start={<Brand />} model={items} end={end} />

    )

}