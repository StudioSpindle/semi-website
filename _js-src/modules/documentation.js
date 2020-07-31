/* documentation tools */
export default function() {
    var codeBlocks = document.getElementsByTagName('code');
    for (var iBlock = 0; iBlock < codeBlocks.length; ++iBlock) {
        // only copy if it is a large block (doesn't have the highlighter-rouge class)
        if(!codeBlocks[iBlock].classList.contains('highlighter-rouge')){
            codeBlocks[iBlock]
                .onmouseenter = function(){
                    // get this
                    var currentElement = this;
                    // add class that contains info
                    if (!currentElement.classList.contains('has-copy-button')){
                        // add copy class
                        currentElement.classList.add('has-copy-button');
                        // add image
                        var el = document.createElement('img');
                        el.src = '/img/copy.svg';
                        el.className = 'copy-on-click-message';
                        el.style.cursor = 'pointer';
                        el.style.top = (14 - (this.clientHeight / 2)) + 'px';
                        el.style.position = 'relative';
                        el.style.left = '-24px';
                        el.style.width = '20px';
                        el.style.height = '20px';
                        el.onclick = function () {
                            // get the content
                            var blockContent = currentElement.innerText;
                            // create copy input element
                            var copy = document.createElement('textarea');
                            document.body.appendChild(copy);
                            copy.setAttribute('id', 'copy_id');
                            // set the content
                            document.getElementById('copy_id').value = blockContent;
                            // select the content
                            copy.select();
                            // copy
                            document.execCommand('copy');
                            // remove
                            document.body.removeChild(copy);
                            // show copied
                            var el = document.getElementsByClassName('copy-on-click-message');
                            for (var iEl = 0; iEl < el.length; ++iEl) {
                                el[iEl].src = '/img/thumb.svg';
                            }
                        }
                        this.parentNode.insertBefore(el, this.nextSibling);
                        // set marginBottom of element
                        this.style.marginBottom = '-1.555rem';
                    }
                }
        }
    }
}