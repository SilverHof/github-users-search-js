//creating header block
const bodyBlock = document.querySelector('body');
const headerBlock = document.createElement('header');
const headerContainer = document.createElement('div');
const headerInner = document.createElement('div');
const headerLogo = document.createElement('h1');
const headerThemeBtn = document.createElement('button');
const headerThemeText = document.createElement('span');
const headerThemeIcon = document.createElement('img');


//adding classes to header block
bodyBlock.classList.add('body');
headerBlock.classList.add('header');
headerContainer.classList.add('header__container');
headerInner.classList.add('header__inner');
headerLogo.classList.add('header__logo');
headerThemeBtn.classList.add('header__theme-btn');
headerThemeText.classList.add('header__theme-text');
headerThemeIcon.classList.add('header__theme-icon');


//adding content to header's elements
headerLogo.textContent = `GUS - search github's user`;
headerThemeText.textContent = `LIGHT`;
headerThemeIcon.src = `img/icon-sun.svg`;

//adding header block to body
bodyBlock.append(headerBlock);
headerBlock.append(headerContainer);
headerContainer.append(headerInner);
headerInner.append(headerLogo);
headerInner.append(headerThemeBtn);
headerThemeBtn.append(headerThemeText);
headerThemeBtn.append(headerThemeIcon);


//creating form block
const mainBlock = document.createElement('main');
const formBlock = document.createElement('section');
const formContainer = document.createElement('div');
const formInner = document.createElement('div');
const formBox = document.createElement('form');
const formIcon = document.createElement('img');
const formInput = document.createElement('input');
const formError = document.createElement('p');
const formBtn = document.createElement('button');


//adding classes to header block
mainBlock.classList.add('main');
formBlock.classList.add('form');
formContainer.classList.add('form__container');
formInner.classList.add('form__inner');
formBox.classList.add('form__box');
formIcon.classList.add('form__icon');
formInput.classList.add('form__input');
formError.classList.add('form__error', 'hidden');
formBtn.classList.add('form__btn');


//adding content to header's elements
formIcon.src = `img/icon-search.svg`;
formInput.placeholder = `Find GitHub username...`;
formError.textContent = `No results`;
formBtn.textContent = `Search`;


//adding header block to body
bodyBlock.append(mainBlock);
mainBlock.append(formBlock);
formBlock.append(formContainer);
formContainer.append(formInner);
formInner.append(formBox);
formBox.append(
    formIcon,
    formInput,
    formError,
    formBtn);


formBtn.addEventListener('click', sumbitDataByClick);
formBtn.addEventListener('keyup', sumbitDataByKeyUp);


function sumbitDataByClick(e) {
    e.preventDefault();

    const fetchByName = formInput.value;

    getUserApi(fetchByName);
}


function sumbitDataByKeyUp(e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        const fetchByName = formInput.value;
        
        getUserApi(fetchByName);
    }
}


// fetch user by api
async function getUserApi(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const parsedResponse = await response.json();
        console.log(parsedResponse);
        
        if (!response.ok) {
            formError.classList.remove('hidden');
        }
        

        return updateDOM(parsedResponse);
    } catch(error) {
        console.log(error);
    }
    
}


function updateDOM(username) {
    //creating user block
    const userBlock = document.createElement('section');
    const userContainer = document.createElement('div');
    const userInner = document.createElement('div');

    const userImg = document.createElement('img');

    const userContent = document.createElement('div');
    const userBio = document.createElement('div');
    const userBoxName = document.createElement('div');
    const userRealName = document.createElement('h2');
    const userNickName = document.createElement('h3');
    const userJoinAt = document.createElement('p');

    const userDescription = document.createElement('p');

    const userInfo = document.createElement('div');

    const userInfoOne = document.createElement('div');
    const userInfoOneRepos = document.createElement('h4');
    const userInfoOneStat = document.createElement('p');

    const userInfoTwo = document.createElement('div');
    const userInfoTwoRepos = document.createElement('h4');
    const userInfoTwoStat = document.createElement('p');

    const userInfoThree = document.createElement('div');
    const userInfoThreeRepos = document.createElement('h4');
    const userInfoThreeStat = document.createElement('p');


    const userLinks = document.createElement('div');

    const userLinksRowOne = document.createElement('div');
    const userLocation = document.createElement('p');
    const userTwitter = document.createElement('a');

    const userLinksRowTwo = document.createElement('div');
    const userWebsite = document.createElement('a');
    const userOrganization = document.createElement('p');


    //adding classes to user's elements
    userBlock.classList.add('user');
    userContainer.classList.add('user__container');
    userInner.classList.add('user__inner');

    userImg.classList.add('user__img');

    userContent.classList.add('user__content');
    
    userBio.classList.add('user__bio');
    userBoxName.classList.add('user__box-name');
    userRealName.classList.add('user__real-name');
    userNickName.classList.add('user__nick-name');

    userJoinAt.classList.add('user__joined-at');

    userDescription.classList.add('user__description');

    userInfo.classList.add('user__info');

    userInfoOne.classList.add('user__info-column');
    userInfoOneRepos.classList.add('user__info-title');
    userInfoOneStat.classList.add('user__info-number');

    userInfoTwo.classList.add('user__info-column');
    userInfoTwoRepos.classList.add('user__info-title');
    userInfoTwoStat.classList.add('user__info-number');

    userInfoThree.classList.add('user__info-column');
    userInfoThreeRepos.classList.add('user__info-title');
    userInfoThreeStat.classList.add('user__info-number');

    userLinks.classList.add('user__links');

    userLinksRowOne.classList.add('user__links-row');
    userLocation.classList.add('user__location');
    userTwitter.classList.add('user__twitter');
    
    userLinksRowTwo.classList.add('user__links-row');
    userWebsite.classList.add('user__website');
    userOrganization.classList.add('user__organization');


    //adding content from api
    userImg.src = username.avatar_url;


    //if github user has not name use username
    if (!username.name || username.name.length < 1) {
        userRealName.textContent = username.login;
    } else {
        userRealName.textContent = username.name;
    }

    userNickName.textContent = `@${username.login}`;


    //adding date of joing
    const joinedAt = username.created_at.split('T')[0];
    const parsedJoinedAt = joinedAt.split('-');

    const year = parsedJoinedAt[0];
    const month = parsedJoinedAt[1];
    const day = parsedJoinedAt[2];

    const date = new Date(year, month, day);
    date.setMonth(month - 1);

    const monthText = date.toLocaleString('en', {
        month: 'short'
    });

    userJoinAt.textContent = `Joined ${day} ${monthText} ${year}`;


    //adding bio info
    if (!username.bio || username.bio.length < 1) {
        userDescription.textContent = `This profile has no bio`;
    } else {
        userDescription.textContent = username.bio;
    }


    //adding repos info
    userInfoOneRepos.textContent = `Repositury`;
    userInfoOneStat.textContent = username.public_repos;

    userInfoTwoRepos.textContent = `Followers`;
    userInfoTwoStat.textContent = username.followers;

    userInfoThreeRepos.textContent = `Following`;
    userInfoThreeStat.textContent = username.following;


    //adding location info
    if (!username.location || username.location.length < 1) {
        userLocation.classList.add('opacity-50');
        userLocation.textContent = `Not Available`;
    } else {
        userLocation.classList.remove('opacity-50');
        userLocation.textContent = username.location;
    }


    //adding twitter info
    if (!username.twitter_username || username.twitter_username.length < 1) {
        userTwitter.classList.add('opacity-50');
        userTwitter.textContent = `Not Available`;
        userTwitter.removeAttribute('href');
    } else {
        userTwitter.classList.remove('opacity-50');
        userTwitter.textContent = `@${
            username.twitter_username
        }`;
        userTwitter.href = `https://twitter.com/${username.twitter_username}`
    }

    //adding website info
    if (!username.blog || username.blog.length < 1) {
        userWebsite.classList.add('opacity-50');
        userWebsite.textContent = `Not Available`;
        userWebsite.removeAttribute('href');
    } else {
        const userWebsiteShort = username.blog.split('/')[2];

        userWebsite.classList.remove('opacity-50');
        userWebsite.textContent = userWebsiteShort;
        userWebsite.href = username.blog;
    }


    //adding organization info
    if (!username.company || username.company.length < 1) {
        userOrganization.classList.add('opacity-50');
        userOrganization.textContent = `Not Available`;
        userOrganization.removeAttribute('href');
    } else {
        const userOrganizationWithoutAt = username.company.split('@')[1];
        userOrganization.textContent = username.company;
        userOrganization.href = `https://github.com/${userOrganizationWithoutAt}`;
    }


    //adding user's elements to main block
    mainBlock.append(userBlock);
    userBlock.append(userContainer);
    userContainer.append(userInner);
    userInner.append(userImg, userContent);

    userContent.append(userBio);

    userBio.append(userBoxName, userJoinAt);

    userBoxName.append(
        userRealName, userNickName
        );
    
    userInfo.append(userInfoOne, 
        userInfoTwo, 
        userInfoThree
        );
    
    userInfoOne.append(
        userInfoOneRepos, 
        userInfoOneStat
        );

    userInfoTwo.append(
        userInfoTwoRepos, 
        userInfoTwoStat
        );

    userInfoThree.append(
        userInfoThreeRepos, 
        userInfoThreeStat
        );

    userLinks.append(
        userLinksRowOne,
        userLinksRowTwo
        );
    
    userLinksRowOne.append(
        userLocation,
        userTwitter
        );

    userLinksRowTwo.append(
        userWebsite,
        userOrganization
        );

    userContent.append(
        userDescription,
        userInfo,
        userLinks
        );

}


headerThemeBtn.addEventListener('click', switchTheme);

function switchTheme(themeToSwitchTo) {
    headerThemeText.textContent = `DARK`;
    bodyBlock.classList.toggle('light-mode');
    if (bodyBlock.classList.contains('light-mode')) {
        headerThemeIcon.src = `img/icon-moon.svg`;
    } else {
        headerThemeIcon.src = `img/icon-sun.svg`;
    }
}
