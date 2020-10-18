import firebase from 'firebase';

var firebaseConfig = {
	apiKey: 'AIzaSyDQ2QE_SLWNM71l51MsV38_z8i8fXdxoDE',
	authDomain: 'zero-chores.firebaseapp.com',
	databaseURL: 'https://zero-chores.firebaseio.com',
	projectId: 'zero-chores',
	storageBucket: 'zero-chores.appspot.com',
	messagingSenderId: '827030560758',
	appId: '1:827030560758:web:f6289fe23e36e0b0f071d7',
};

export default firebase.initializeApp(firebaseConfig);
