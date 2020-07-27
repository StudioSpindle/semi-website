/* documentation tools */
export default function() {
    var codeBlocks = document.getElementsByTagName('code');
    for (var iBlock = 0; iBlock < codeBlocks.length; ++iBlock) {
        // only copy if it is a large block (doesn't have the highlighter-rouge class)
        if(!codeBlocks[iBlock].classList.contains('highlighter-rouge')){
            codeBlocks[iBlock]
                .onclick = function(){
                    // get the content
                    var blockContent = this.innerText;
                    // create copy input element
                    var copy = document.createElement('textarea');
                    document.body.appendChild(copy);
                    copy.setAttribute('id', 'copy_id');
                    // set the content
                    document.getElementById('copy_id').value=blockContent;
                    // select the content
                    copy.select();
                    // copy
                    document.execCommand('copy');
                    // remove
                    document.body.removeChild(copy);
                    // show copied
                    var el = document.getElementsByClassName('copy-on-click-message');
                    for (iEl = 0; iEl < el.length; ++iEl) {
                        el[iEl].src = '/img/thumb.svg';
                    }
                };
            codeBlocks[iBlock]
                .onmouseenter = function(){
                    var el = document.createElement('img');
                    el.src = '/img/copy.svg';
                    el.className = 'copy-on-click-message';
                    el.style.top = (-10 - (this.clientHeight / 2)) + 'px';
                    el.style.position = 'relative';
                    el.style.left = '-24px';
                    el.style.width = '20px';
                    el.style.height = '20px';
                    this.parentNode.insertBefore(el, this.nextSibling);
                }
            codeBlocks[iBlock]
                .onmouseleave = function(){
                    var el = document.getElementsByClassName('copy-on-click-message');
                    for (var iEl = 0; iEl < el.length; ++iEl) {
                        el[iEl].remove();
                    }
                }
        }
    }
}