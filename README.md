# alkemy-Backend

## Register

>First you have to register, once you do it, you 'll recive a mail verifying it.

## Login
>When you login, a token will be send to you as a response.

>To request the api, this token must be send on each request as a header 'authorization' with the format "Bearer" + " " + "Your token".

>This token expires in 10 hours, so you will have to login again.

## Requesting

### Characters
>You can create, read, update and delete characters. Also you can list all the characters stored.

>You can filter them by params:
* Name
* Age
* Weight
* Movie

>You can also asociate the character to a movie when creating or updating it by the movie's ID by sending:

    Body : {
        ...other attributes,
        movies : [id1, id2]
    }

### Movies
>You can create, read, update and delete movies. Also you can list all the movies stored. 

>You can filter them by params:
* Name
* Genre (This param refers to one genre ID)
* ASC or DESC (which specifies the alphabet order)

>When adding a movie you will have to send, among other attributes:

* Rate : between 0 and 5, it expects a string and it accepts float numbers
* Date : YYYY-MM-DD format
* Characters : As creating a character
* Genres : An array with one int that refers to a genre ID
>

    Body : {
        ...other attributes,
        rate : '3.2',
        date : '2000-12-23',
        Characters : [1, 4, 5],
        Genres : [2]
    }

### Genres
>You can create, list all the genres, update and delete them.

