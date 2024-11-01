import CarouselHeader from '../dashboard/CarouselHeader';
import Courses from '../dashboard/Courses';
import Testimonies from '../dashboard/Testimonies';
import Trends from '../dashboard/Trends';

export default function Dashboard() {

    return (
        <>
            <div className='flex justify-content-center'>
                <div className='w-8 py-8'>
                    <CarouselHeader />
                </div>
            </div>
            <div className='flex justify-content-center surface-100'>
                <div className='w-8 py-6 '>
                    <Courses />
                </div>
            </div>

            <div className='flex justify-content-center'>
                <div className='w-8 py-6'>
                    <Trends />
                </div>
            </div>

            <div className='flex justify-content-center surface-100'>
                <div className='w-8 py-6'>
                    <Testimonies />
                </div>
            </div>

            <div className='flex justify-content-center'>
                <div className='w-8 py-6'>
                    < p>Footer Section</p>
                </div>
            </div>
        </>

    );

}
