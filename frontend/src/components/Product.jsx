import { Box, Checkbox, Image, Text, Tooltip } from '@chakra-ui/react'

import Colors from '../utils/Colors';

const Product = ({ product, isChecked, onChange, isDisabled }) => {
    const colors = Colors();
    return (
        <Tooltip label={product.instruction} hasArrow placement="top">
            <Box
                className="home-routine-box"
                bg={colors.BRIGHT4}
                key={product._id}
                borderRadius="xl"
                opacity={isChecked ? 0.45 : 1}
                transition="transform 0.1s ease-in-out"
                _hover={{
                    transform: 'scale(1.04)',
                }}
            >
                <Checkbox
                    className="home-routine-checkbox"
                    value={product.name}
                    size="lg"
                    isChecked={isChecked}
                    onChange={onChange}
                    isDisabled={isDisabled}
                >
                    <Text color="white">{product.name}</Text>
                </Checkbox>
                <Image
                    className="home-routine-image"
                    src={product.imageUrl}
                    alt={product.name}
                    borderRadius="xl"
                />
            </Box>
        </Tooltip>
    );
};

export default Product