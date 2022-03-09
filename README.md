# Cors-Extends

Cors-Extend is a package which provides the configuration to the existing [Cors](http://www.senchalabs.org/connect/) nodejs package and which enables to configure cors according to the environments.

# Installation

- [Cors-Extends](#cors-extends)
- [Installation](#installation)
	- [Usage](#usage)
		- [Simple Usage (define environments & global configuration)](#simple-usage-define-environments--global-configuration)
	- [Configuration By Environment Variable](#configuration-by-environment-variable)
		- [Configure the Origin](#configure-the-origin)
		- [Configure the Routes](#configure-the-routes)

```sh
$ npm install cors-extends
```

## Usage

### Simple Usage (define environments & global configuration)

```javascript
import cors from "cors";
import { corsExtends } from "cors-extend";

cors(
	corsExtends({
		env: {
			development: {
				origins: [
					{
						origin: "http://localhost:3000",
						methods: ["GET"],
					},
				],
				routes: [
					{
						endpoint: "/characters",
						methods: ["GET", "POST"],
						origins: ["http://localhost:5000"],
					},
				],
			},
		},
		global: {
			blockHttpClient: true,
		},
	}),
);
```

## Configuration By Environment Variable

Cors-Extend is capable of loading specific configuration according to Environment variable, **ENVIRONMENT**. The variable can be pass either by dotenv cli, .env file or any other way.

`Note` that both environment variable value and configuration name should be equal\*

After configuring environment variable in configuration file under the env object specify the environment name
<br>

```javascript
cors(corsExtends({
  env{
    development:{

    }
  }
}))
```

The endpoints can be configured in two ways
<br>

### Configure the Origin

By using this configuration we can specify the origins and methods that are allowed for that origins, for the entire application.

origins is an array of object which has a template of

```
{
  origin:"Origin Name",
  methods:["GET","POST","PUT","DELETE","PATCH"]
}
```

Example:

```javascript
env: {
	development: {
		origins: [
			{
				origin: "http://localhost:3000",
				methods: ["GET"],
			},
		];
	}
}
```

So, according to the above configuration the application will only accept **GET** requests from the client **http://localhost:3000**

`Note` When the origins param or configuration for the certain environment is unspecified, all the requests from all origins will be accepted **(Not recommended)**.

### Configure the Routes

Routes configuration is used to specify the cors configuration for certain routes.

routes is an array of object which has a template of

| Property | Type | Optional | Description |
| -------- | ---- | --- |----------- |
| endpoint | String | false | Specify the **Route** that needs to be configured |
| methods | String[] | true | Specify the **Methods** that would be allowed to the route |
| origins | String[] | false | Specify the **Origins** that would be allowed to the route |
| blockHttpClient | Boolean | true | Specify whether to block requests from **non Browser Clients** |

Example:

```javascript
env: {
	development: {
	  origins: [
	   {
	    endpoint: "/route",
	    methods: ["GET","POST"],
	    origins: [
		"http://localhost:1000",
		"http://web.sankalpafernando"
	    ],
	    blockHttpClient: false,
	   },
	  ];
	}
}
```