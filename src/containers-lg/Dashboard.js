import CarouselHeader from '../components/dashboard/CarouselHeader';
import Courses from '../components/dashboard/Courses';
import Testimonials from '../containers-sm/Testimonials';
import Trends from '../components/dashboard/Trends';

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
                    <Testimonials />
                </div>
            </div>
        </>

    );

}
