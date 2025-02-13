import japan1 from '@/assets/images/Japan_1.png';
import japan2 from '@/assets/images/posts/Japan_2.png';
import france1 from '@/assets/images/posts/France1.png';
import usa1 from '@/assets/images/posts/USA_1.png';
import italy1 from '@/assets/images/posts/Italy_1.png';
import { Post, Rating } from '@/data/types';
import { Timestamp } from 'firebase/firestore';

export const Posts: Post[] = [
    {
        id: '1',
        title: 'Japan Adventure',
        content: 'Visited Tokyo and Kyoto, had the best sushi!',
        published: true, 
        authorUid: 'user123', 
        images: [japan1, japan2], // Up to 5 images
        createdAt: Timestamp.fromDate(new Date('2023-08-31')),
        rating: Rating.five,
        comment: ['Thanks for sharing!', 'Woah so cool!', 'I love this!']
    },
    {
        id: '2',
        title: 'Romantic Paris',
        content: 'Saw the Eiffel Tower and ate lots of croissants!',
        published: true,
        authorUid: 'user456',
        images: [france1],
        createdAt: Timestamp.fromDate(new Date('2023-09-15')),
        rating: Rating.four,
        comment: ['Paris is always a good idea!', 'I need to go there!']
    },
    {
        id: '3',
        title: 'New York City Lights',
        content: 'Times Square was amazing, but Central Park stole my heart.',
        published: true,
        authorUid: 'user789',
        images: [usa1],
        createdAt: Timestamp.fromDate(new Date('2023-10-10')),
        rating: Rating.five,
        comment: ['NYC never sleeps!', 'Great pictures!', 'I love NYC!']
    },
    {
        id: '4',
        title: 'Italian Getaway',
        content: 'Venice canals and Roman history were unforgettable!',
        published: true,
        authorUid: 'user321',
        images: [italy1],
        createdAt: Timestamp.fromDate(new Date('2023-11-20')),
        rating: Rating.five,
        comment: ['Italy is on my bucket list!', 'Amazing trip!']
    }
];
