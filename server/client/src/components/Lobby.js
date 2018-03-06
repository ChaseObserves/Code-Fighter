import React, { Component } from "react";
import ReactAce from "./ReactAce";

class Lobby extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col m8">
            <h5>Situation</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              mollis libero est, ut commodo velit tempor id. Fusce et congue
              eros. Suspendisse aliquam odio non vulputate efficitur.
              Suspendisse non libero laoreet, tempor mi non, pellentesque metus.
              Sed ac porta nisi. Aliquam commodo fringilla eros, ac mollis metus
              commodo quis. Aliquam erat volutpat. Vivamus vulputate viverra
              mauris non aliquet. Integer eu nibh justo. Donec blandit diam quis
              mauris condimentum, vitae sollicitudin quam varius. Sed ut
              hendrerit dolor. Curabitur molestie odio velit, eget suscipit mi
              volutpat in. Praesent sit amet augue justo. Curabitur rhoncus
              venenatis lorem vitae molestie.
            </p>
            <ReactAce />
          </div>
          <div className="col m4">
            <h5>Example</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              mollis libero est, ut commodo velit tempor id. Fusce et congue
              eros. Suspendisse aliquam odio non vulputate efficitur.
              Suspendisse non libero laoreet, tempor mi non, pellentesque metus.
              Sed ac porta nisi. Aliquam commodo fringilla eros, ac mollis metus
              commodo quis. Aliquam erat volutpat. Vivamus vulputate viverra
              mauris non aliquet. Integer eu nibh justo. Donec blandit diam quis
              mauris condimentum, vitae sollicitudin quam varius. Sed ut
              hendrerit dolor. Curabitur molestie odio velit, eget suscipit mi
              volutpat in. Praesent sit amet augue justo. Curabitur rhoncus
              venenatis lorem vitae molestie. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Mauris mollis libero est, ut commodo
              velit tempor id. Fusce et congue eros. Suspendisse aliquam odio
              non vulputate efficitur. Suspendisse non libero laoreet, tempor mi
              non, pellentesque metus. Sed ac porta nisi. Aliquam commodo
              fringilla eros, ac mollis metus commodo quis. Aliquam erat
              volutpat. Vivamus vulputate viverra mauris non aliquet. Integer eu
              nibh justo. Donec blandit diam quis mauris condimentum, vitae
              sollicitudin quam varius. Sed ut hendrerit dolor. Curabitur
              molestie odio velit, eget suscipit mi volutpat in. Praesent sit
              amet augue justo. Curabitur rhoncus venenatis lorem vitae
              molestie.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
