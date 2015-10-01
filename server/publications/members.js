/* eslint quote-props: 0 */
/**
 * ShopMembers
 * @return {Array} users
 */
Meteor.publish("ShopMembers", function() {
  let permissions = ["dashboard/orders", "owner", "admin", "dashboard/customers"];
  let shopId = ReactionCore.getShopId(this);

  if (Roles.userIsInRole(this.userId, permissions, shopId)) {
    let users = Meteor.users.find({
      [`roles.${shopId}`]: {
        $nin: ["anonymous"]
      }
    }, {
      fields: {
        _id: 1,
        email: 1,
        username: 1,
        roles: 1,

        // Google
        "services.google.name": 1,
        "services.google.email": 1,
        "services.google.picture": 1,

        // Twitter
        "services.twitter.name": 1,
        "services.twitter.email": 1,
        "services.twitter.picture": 1,

        // Facebook
        "services.facebook.name": 1,
        "services.facebook.email": 1,
        "services.facebook.picture": 1,

        // Weibo
        "services.weibo.name": 1,
        "services.weibo.email": 1,
        "services.weibo.picture": 1,

        // Github
        "services.github.name": 1,
        "services.github.email": 1,
        "services.github.picture": 1
      }
    });

    return users;
  }

  ReactionCore.Log.info("ShopMembers access denied");
  return [];
});
