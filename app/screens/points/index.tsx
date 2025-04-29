import { View, Modal } from "react-native";

const points = () => {
    return (
        <Modal transparent={true} visible={true}>
            <View style={{
                backgroundColor: 'white',
                opacity: 0.9
            }}>
                {/* Modal content */}
            </View>
        </Modal>

    );
};

export default points 