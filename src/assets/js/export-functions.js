

export const DisableRightClick = ( e ) => {
    e.preventDefault()
}

export const DisableDrag = ( e ) => {
    e.preventDefault()
}

export const getCookies = ( ) => {
    // console.log( req.headers )
    const rawCookies = document.cookie.split(';')
    const parsedCookies = {}
    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1]
    })
    return parsedCookies
}

export const getThemeName = ( themeString, type ) => {

    if( type === 'f2b' ){ // frontend to backend
        switch( themeString ) {
            case "Classic": 
                return "classic"
            
            case "Classic 2":
                return "classic2"
                
            case "Love":
                return "love"
            
            case "Classic Love":
                return "classicLove"
    
            case 'Aniversary':
                return "aniversary"

            case "Classic Aniversary":
                return "classicAniversary"
    
            case "Birthday":
                return "birthday"
    
            case "Classic Birthday":
                return "classicBirthday"
    
            default:
                return "classic"
        }
    }
    else if( type === "b2f" ){ //backend to frontend
        switch( themeString ) {
            case "classic": 
                return "Classic"
            
            case "classic2":
                return "Classic 2"
                
            case "love":
                return "Love"
            
            case "classicLove":
                return "Classic Love"
    
            case 'aniversary':
                return "Aniversary"
            case "classicAniversary":
                return "Classic Aniversary"
    
            case "birthday":
                return "Birthday"
    
            case "classicBirthday":
                return "Classic Birthday"
    
            default:
                return "Classic"
        }
    }
    
}

export const getAlbumPrivacy = ( privacyString, type ) => {
    if( type === "b2f" ){ // backend to frontend
        switch( privacyString ){
            case "onlyme":
                return "Only me"

            case 'public':
                return "Public"

            case "unlisted":
                return "Unlisted"

            case "specific":
                return "Specific Users"

            default: 
                return "Only me"
        }
    }
    if( type === "f2b" ){ //frontend to backend
        switch( privacyString ){
            case "Only me":
                return 'onlyme'

            case 'Specific Users':
                return 'specific'

            case "Unlisted":
                return "unlisted"

            case "Public":
                return "public"

            default:
                return 'onlyme'
        }
    }
}

export const randomString = ( length ) => {
    const array_of_chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9','-','_']
    let str = ''
    for( let i=0; i < length; i++ ){
        str += array_of_chars[Math.ceil(Math.random() * (array_of_chars.length - 1))]
    }
    return str
}

export default DisableRightClick