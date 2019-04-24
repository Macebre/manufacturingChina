import '../../scss/views/index.scss';
import '../components/poppup';

if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../../html/views/index.html');
}

// if (module.hot) {
//     module.hot.accept('../components/app', () => {
//         console.log('Accepting the updated app module!');
//     });
// }
