var jwt = {
    id: "628eca207e41f75d3b07e3ae",
    email: "user1@milano.com",
    lastLoginAt: "2022-05-29T02:32:17.359Z",
    iat: 1653799325,
    exp: 1653799385,
};
var init = { iat: null, exp: null, status: false, accessToken: null };
var accessToken = "accessToken:nulleyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
var res = {
    id: "628eca207e41f75d3b07e3ae",
    email: "user1@milano.com",
    lastLoginAt: "2022-05-29T21:53:23.687Z",
    iat: 1653861318,
    exp: 1653861378,
};
const clone = (({ iat, exp, ...o }) => o)(res); 

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

function exclude(obj = {}, excluded = []) {
    // const keys = Array.prototype.slice.call(arguments)
    Object.keys(obj).reduce( (accumulator, currentValue) =>{
        if (excluded.indexOf(currentValue) === -1){
            accumulator = { ...accumulator, }
        }
    }, {included: {}, excluded: {}} )

}
