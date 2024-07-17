import home from '../../public/assets/icons/home.svg'
import people from '../../public/assets/icons/people.svg'
import save from '../../public/assets/icons/save.svg'
import wallpaper from '../../public/assets/icons/wallpaper.svg'
import gallery_add from '../../public/assets/icons/gallery-add.svg'


export const SidebarLinks = [
    {
        label : 'Home',
        link : '/',
        imageURL : home
    },
    {
        label : 'Explore',
        link : '/explore',
        imageURL : wallpaper
    },
    {
        label : 'People',
        link : '/all-users',
        imageURL : people
    },
    {
        label : 'Saved',
        link : '/saved',
        imageURL : save
    },
    {
        label : 'Create Post',
        link : '/create-post',
        imageURL : gallery_add
    },
    
]

export const BottomLinks = [
    {
        label : 'Home',
        link : '/',
        imageURL : home
    },
    {
        label : 'Explore',
        link : '/explore',
        imageURL : wallpaper
    },
    {
        label : 'Saved',
        link : '/saved',
        imageURL : save
    },
    {
        label : 'Create',
        link : '/create-post',
        imageURL : gallery_add
    },
    
]

export const stats : string[] = ['Posts','Followers','Following']