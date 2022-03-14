import React from "react";

function FriendComponent(props) {
  return (
    <div className="col-md-6 friendComponent">
      <h4 className="componentHeader">Friends List</h4>
      <button className="closeFriend" onClick={props.closeComponent}>X</button>
      <div>
          
        <button className="btn submitBtn" onClick={props.socialCardRender}>Find Friends</button>
      </div>
    </div>
  );
}

export default FriendComponent;