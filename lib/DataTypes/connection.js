/**
 * A Connection Object
 * @property {Boolean} verified
 * @property {String} name
 * @property {Boolean} show_activity
 * @property {Boolean} friend_sync
 * @property {String} type
 * @property {String} id
 * @property {Number} visibility
 */
class Connection {
  /**
   * @param {Boolean} verified
   * @param {String} name
   * @param {Boolean} show_activity
   * @param {Boolean} friend_sync
   * @param {String} type
   * @param {String} id
   * @param {Number} visibility
   */
  constructor(verified, name, show_activity, friend_sync, type, id, visibility) {
    this.isVerified = verified;
    this.username = name;
    this.showActivity = show_activity;
    this.friendSync = friend_sync;
    this.service = type;
    this.id = id;
    if (visibility == 0) this.isVisible = false;else if (visibility == 1) this.isVisible = true;
  }

}

module.exports = Connection;