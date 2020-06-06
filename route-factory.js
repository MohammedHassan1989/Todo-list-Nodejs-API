

var routeFuctory = function () {
    var routeDep = this;
    routeDep['urls'] = [];


    var requires = [
        {
            routerName: 'categoriesRoute', routerSource: './router/categories-route',
            routURL: '/api/categories'

        },
        {
            routerName: 'activitiesRoute', routerSource: './router/activities-route',
            routURL: '/api/activities'

        },
        {
            routerName: 'goalsRoute', routerSource: './router/goals-route',
            routURL: '/api/goals'

        },
        {
            routerName: 'UsersRouter', routerSource: './router/users-route',
            routURL: '/api/users'

        },
    ]



    requires.forEach(res => {
    
        routeDep[res.routerName] = require(res.routerSource)()
        routeDep['urls'].push(
            { url: res.routURL, routeto: routeDep[res.routerName] }
        )
    });
}

module.exports = new routeFuctory;