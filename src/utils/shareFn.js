export default function shareFn(e, blogId, blogShortDesc) {
  e.preventDefault();
  e.stopPropagation();

  if (navigator.share) {
    const shareData = {
      title: blogShortDesc,
      text: blogShortDesc + '\n\n',
      url: `${window.location.origin}/news/${blogId}`,
    };

    navigator
      .share(shareData)
      .then(() => {
        console.log('Share successful');
      })
      .catch((error) => {
        console.error('Share failed:', error);
      });
  }
}
