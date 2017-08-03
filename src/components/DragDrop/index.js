import React,{Component} from 'react'
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';

class DragDrop extends React.Component {
    constructor(props){
        super(props)
        this.state = { list : [{ name : "List number 1" },{ name : "List number 2" },{ name : "List number 3" }] }
        this.onReorderGroup = this.onReorderGroup.bind(this);
    }
    
    onReorder (event, previousIndex, nextIndex, fromId, toId) {
      
    }

    onReorderGroup (event, previousIndex, nextIndex, fromId, toId) {
      if (fromId === toId) {
        const list = reorderImmutable(this.state[fromId], previousIndex, nextIndex);

        this.setState({
          [fromId]: list
        });
      } else {
        const lists = reorderFromToImmutable({
          from: this.state[fromId],
          to: this.state[toId]
        }, previousIndex, nextIndex);

        this.setState({
          [fromId]: lists.from,
          [toId]: lists.to
        });
      }
    }    
    
    render() {
        return(
        <Reorder
          reorderId="my-list" // Unique ID that is used internally to track this list (required) 
          reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional) 
          component="ul" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div' 
          placeholderClassName="placeholder" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder' 
          draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged' 
          lock="horizontal" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups) 
          holdTime={500} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0 
          touchHoldTime={500} // Hold time before dragging begins on touch devices (optional), defaults to holdTime 
          mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime 
          onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state) 
          autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true 
          disabled={false} // Disable reordering (optional), defaults to false 
          disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true 
          placeholder={
            <div className="custom-placeholder" /> // Custom placeholder element (optional), defaults to clone of dragged element 
          }
        >
          {
            this.state.list.map((item) => (
              <div key={item.name}>
                {item.name}
              </div>
            ))
            /*
            Note this example is an ImmutableJS List so we must convert it to an array.
            I've left this up to you to covert to an array, as react-reorder updates a lot,
            and if I called this internally it could get rather slow,
            whereas you have greater control over your component updates.
            */
          }
        </Reorder>
        )
    }
    
}

export default DragDrop;